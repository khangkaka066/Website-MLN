import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "";
const API = `${BACKEND_URL}/api`;

export const useGameStats = ({ pollMs = 7000 } = {}) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const timerRef = useRef(null);

  const fetchStats = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/game/stats`);
      setStats(res.data);
      setError(null);
    } catch (e) {
      setError(e?.message || "Không tải được thống kê");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
    if (pollMs > 0) {
      timerRef.current = setInterval(fetchStats, pollMs);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [fetchStats, pollMs]);

  return { stats, loading, error, refresh: fetchStats };
};

const SESSION_KEY = "avc.play.sessionId";
const SUBMITTED_KEY = "avc.play.submitted";

const genSessionId = () =>
  `s_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;

export const useGameSession = () => {
  const [sessionId, setSessionId] = useState(() => {
    if (typeof window === "undefined") return "";
    try {
      const existing = window.sessionStorage.getItem(SESSION_KEY);
      if (existing) return existing;
      const fresh = genSessionId();
      window.sessionStorage.setItem(SESSION_KEY, fresh);
      return fresh;
    } catch {
      return genSessionId();
    }
  });

  const reset = useCallback(() => {
    const fresh = genSessionId();
    try {
      window.sessionStorage.setItem(SESSION_KEY, fresh);
      window.sessionStorage.removeItem(SUBMITTED_KEY);
    } catch {
      /* ignore */
    }
    setSessionId(fresh);
    return fresh;
  }, []);

  const markSubmitted = useCallback((id) => {
    try {
      window.sessionStorage.setItem(SUBMITTED_KEY, id);
    } catch {
      /* ignore */
    }
  }, []);

  const isSubmitted = useCallback(() => {
    try {
      return window.sessionStorage.getItem(SUBMITTED_KEY) === sessionId;
    } catch {
      return false;
    }
  }, [sessionId]);

  return { sessionId, reset, markSubmitted, isSubmitted };
};

export const submitGameResult = async ({ sessionId, answers, score, total }) => {
  const payload = {
    session_id: sessionId,
    answers: answers.map((a) => ({
      claim_id: a.claim_id,
      choice: a.choice,
      correct: a.correct,
    })),
    score,
    total,
  };
  const res = await axios.post(`${API}/game/submit`, payload);
  return res.data;
};
