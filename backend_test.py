#!/usr/bin/env python3
"""
Backend API tests for AI Verification Card game endpoints.
Tests POST /api/game/submit and GET /api/game/stats.
"""
import requests
import sys
import uuid
from datetime import datetime

# Use the public endpoint
BASE_URL = "https://ai-verify-card.preview.emergentagent.com/api"

class GameAPITester:
    def __init__(self):
        self.tests_run = 0
        self.tests_passed = 0
        self.tests_failed = 0
        self.session_ids = []

    def log(self, msg, level="INFO"):
        """Log test messages"""
        print(f"[{level}] {msg}")

    def run_test(self, name, test_func):
        """Run a single test"""
        self.tests_run += 1
        self.log(f"\n{'='*60}")
        self.log(f"Test {self.tests_run}: {name}")
        self.log('='*60)
        try:
            test_func()
            self.tests_passed += 1
            self.log(f"✅ PASSED: {name}", "SUCCESS")
            return True
        except AssertionError as e:
            self.tests_failed += 1
            self.log(f"❌ FAILED: {name}", "ERROR")
            self.log(f"   Reason: {str(e)}", "ERROR")
            return False
        except Exception as e:
            self.tests_failed += 1
            self.log(f"❌ ERROR: {name}", "ERROR")
            self.log(f"   Exception: {str(e)}", "ERROR")
            return False

    def test_get_stats_initial(self):
        """Test GET /api/game/stats - should return valid structure even if empty"""
        self.log("Testing GET /api/game/stats (initial state)")
        response = requests.get(f"{BASE_URL}/game/stats", timeout=10)
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        data = response.json()
        self.log(f"Response: {data}")
        
        # Check required fields
        assert "total_players" in data, "Missing total_players"
        assert "average_score" in data, "Missing average_score"
        assert "average_correct_pct" in data, "Missing average_correct_pct"
        assert "claim_stats" in data, "Missing claim_stats"
        assert "updated_at" in data, "Missing updated_at"
        
        assert isinstance(data["total_players"], int), "total_players should be int"
        assert isinstance(data["average_score"], (int, float)), "average_score should be numeric"
        assert isinstance(data["average_correct_pct"], (int, float)), "average_correct_pct should be numeric"
        assert isinstance(data["claim_stats"], list), "claim_stats should be list"
        
        self.log(f"Total players: {data['total_players']}")
        self.log(f"Average score: {data['average_score']}")
        self.log(f"Average correct %: {data['average_correct_pct']}")

    def test_submit_valid_game(self):
        """Test POST /api/game/submit with valid payload"""
        self.log("Testing POST /api/game/submit with valid payload")
        
        session_id = f"test_{uuid.uuid4().hex[:16]}"
        self.session_ids.append(session_id)
        
        payload = {
            "session_id": session_id,
            "answers": [
                {"claim_id": "claim-1", "choice": "verify", "correct": True},
                {"claim_id": "claim-2", "choice": "verify", "correct": True},
                {"claim_id": "claim-3", "choice": "pass", "correct": True},
                {"claim_id": "claim-4", "choice": "verify", "correct": True},
                {"claim_id": "claim-5", "choice": "pass", "correct": True},
                {"claim_id": "claim-6", "choice": "verify", "correct": True},
                {"claim_id": "claim-7", "choice": "verify", "correct": True},
                {"claim_id": "claim-8", "choice": "verify", "correct": True},
            ],
            "score": 94,
            "total": 8
        }
        
        response = requests.post(f"{BASE_URL}/game/submit", json=payload, timeout=10)
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        self.log(f"Response: {data}")
        
        # Check required fields
        assert data.get("ok") is True, "Expected ok=true"
        assert "submission_id" in data, "Missing submission_id"
        assert "correct_count" in data, "Missing correct_count"
        assert data.get("duplicate") is False, "First submission should not be duplicate"
        
        # Verify correct_count matches
        expected_correct = sum(1 for a in payload["answers"] if a["correct"])
        assert data["correct_count"] == expected_correct, f"Expected correct_count={expected_correct}, got {data['correct_count']}"
        
        self.log(f"Submission ID: {data['submission_id']}")
        self.log(f"Correct count: {data['correct_count']}")

    def test_submit_duplicate_session(self):
        """Test POST /api/game/submit with duplicate session_id (idempotency)"""
        self.log("Testing POST /api/game/submit with duplicate session_id")
        
        # Use the same session_id from previous test
        if not self.session_ids:
            session_id = f"test_{uuid.uuid4().hex[:16]}"
            # Submit first time
            payload = {
                "session_id": session_id,
                "answers": [
                    {"claim_id": "claim-1", "choice": "pass", "correct": False},
                ],
                "score": 0,
                "total": 1
            }
            requests.post(f"{BASE_URL}/game/submit", json=payload, timeout=10)
        else:
            session_id = self.session_ids[0]
        
        # Submit again with same session_id
        payload = {
            "session_id": session_id,
            "answers": [
                {"claim_id": "claim-1", "choice": "verify", "correct": True},
            ],
            "score": 10,
            "total": 1
        }
        
        response = requests.post(f"{BASE_URL}/game/submit", json=payload, timeout=10)
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        self.log(f"Response: {data}")
        
        # Check duplicate flag
        assert data.get("ok") is True, "Expected ok=true"
        assert data.get("duplicate") is True, "Expected duplicate=true for second submission"
        
        self.log("✓ Idempotency working: duplicate submission detected")

    def test_submit_invalid_missing_fields(self):
        """Test POST /api/game/submit with missing required fields"""
        self.log("Testing POST /api/game/submit with missing fields")
        
        # Missing session_id
        payload = {
            "answers": [{"claim_id": "claim-1", "choice": "pass", "correct": True}],
            "score": 10,
            "total": 1
        }
        
        response = requests.post(f"{BASE_URL}/game/submit", json=payload, timeout=10)
        
        assert response.status_code in [400, 422], f"Expected 400/422 for missing session_id, got {response.status_code}"
        self.log(f"✓ Correctly rejected missing session_id with status {response.status_code}")

    def test_submit_invalid_choice(self):
        """Test POST /api/game/submit with invalid choice value"""
        self.log("Testing POST /api/game/submit with invalid choice")
        
        session_id = f"test_{uuid.uuid4().hex[:16]}"
        payload = {
            "session_id": session_id,
            "answers": [
                {"claim_id": "claim-1", "choice": "invalid_choice", "correct": True}
            ],
            "score": 10,
            "total": 1
        }
        
        response = requests.post(f"{BASE_URL}/game/submit", json=payload, timeout=10)
        
        assert response.status_code in [400, 422], f"Expected 400/422 for invalid choice, got {response.status_code}"
        self.log(f"✓ Correctly rejected invalid choice with status {response.status_code}")

    def test_stats_after_submission(self):
        """Test GET /api/game/stats after submissions"""
        self.log("Testing GET /api/game/stats after submissions")
        
        # Submit a new game first
        session_id = f"test_{uuid.uuid4().hex[:16]}"
        payload = {
            "session_id": session_id,
            "answers": [
                {"claim_id": "claim-1", "choice": "verify", "correct": True},
                {"claim_id": "claim-2", "choice": "pass", "correct": False},
            ],
            "score": 10,
            "total": 2
        }
        requests.post(f"{BASE_URL}/game/submit", json=payload, timeout=10)
        
        # Get stats
        response = requests.get(f"{BASE_URL}/game/stats", timeout=10)
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        data = response.json()
        self.log(f"Stats after submission: {data}")
        
        # Should have at least 1 player now
        assert data["total_players"] >= 1, f"Expected at least 1 player, got {data['total_players']}"
        
        # Check claim_stats structure
        if data["claim_stats"]:
            claim_stat = data["claim_stats"][0]
            assert "claim_id" in claim_stat, "Missing claim_id in claim_stats"
            assert "total" in claim_stat, "Missing total in claim_stats"
            assert "pass_count" in claim_stat, "Missing pass_count"
            assert "verify_count" in claim_stat, "Missing verify_count"
            assert "pass_pct" in claim_stat, "Missing pass_pct"
            assert "verify_pct" in claim_stat, "Missing verify_pct"
            assert "correct_pct" in claim_stat, "Missing correct_pct"
            
            self.log(f"Sample claim stat: {claim_stat}")
            
            # Verify percentages add up to ~100
            total_pct = claim_stat["pass_pct"] + claim_stat["verify_pct"]
            assert 99 <= total_pct <= 101, f"pass_pct + verify_pct should be ~100, got {total_pct}"

    def test_stats_percentages(self):
        """Test that stats percentages are calculated correctly"""
        self.log("Testing stats percentage calculations")
        
        response = requests.get(f"{BASE_URL}/game/stats", timeout=10)
        data = response.json()
        
        if data["total_players"] > 0:
            # Check average_correct_pct is between 0 and 100
            assert 0 <= data["average_correct_pct"] <= 100, f"average_correct_pct should be 0-100, got {data['average_correct_pct']}"
            
            # Check each claim stat
            for claim_stat in data["claim_stats"]:
                assert 0 <= claim_stat["pass_pct"] <= 100, f"pass_pct should be 0-100"
                assert 0 <= claim_stat["verify_pct"] <= 100, f"verify_pct should be 0-100"
                assert 0 <= claim_stat["correct_pct"] <= 100, f"correct_pct should be 0-100"
                
                # pass_pct + verify_pct should be ~100
                total = claim_stat["pass_pct"] + claim_stat["verify_pct"]
                assert 99 <= total <= 101, f"pass_pct + verify_pct should be ~100, got {total}"
            
            self.log("✓ All percentages are valid")
        else:
            self.log("⚠ No players yet, skipping percentage validation")

    def run_all_tests(self):
        """Run all tests"""
        self.log("\n" + "="*60)
        self.log("AI VERIFICATION CARD - BACKEND API TESTS")
        self.log("="*60)
        self.log(f"Base URL: {BASE_URL}")
        self.log(f"Started at: {datetime.now().isoformat()}")
        
        # Run tests in order
        self.run_test("GET /api/game/stats (initial)", self.test_get_stats_initial)
        self.run_test("POST /api/game/submit (valid payload)", self.test_submit_valid_game)
        self.run_test("POST /api/game/submit (duplicate session_id)", self.test_submit_duplicate_session)
        self.run_test("POST /api/game/submit (missing fields)", self.test_submit_invalid_missing_fields)
        self.run_test("POST /api/game/submit (invalid choice)", self.test_submit_invalid_choice)
        self.run_test("GET /api/game/stats (after submissions)", self.test_stats_after_submission)
        self.run_test("Stats percentage calculations", self.test_stats_percentages)
        
        # Summary
        self.log("\n" + "="*60)
        self.log("TEST SUMMARY")
        self.log("="*60)
        self.log(f"Total tests: {self.tests_run}")
        self.log(f"Passed: {self.tests_passed} ✅")
        self.log(f"Failed: {self.tests_failed} ❌")
        self.log(f"Success rate: {(self.tests_passed/self.tests_run*100):.1f}%")
        
        return 0 if self.tests_failed == 0 else 1

def main():
    tester = GameAPITester()
    return tester.run_all_tests()

if __name__ == "__main__":
    sys.exit(main())
