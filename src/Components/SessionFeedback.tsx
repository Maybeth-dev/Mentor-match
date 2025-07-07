// src/components/SessionFeedback.tsx
import React, { useState } from 'react';
import axios from '../api/axiosInstance';

interface Props {
  sessionId: string;
  onSubmitted?: () => void;
}

const SessionFeedback: React.FC<Props> = ({ sessionId, onSubmitted }) => {
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await axios.put(`/sessions/${sessionId}/feedback`, {
        rating,
        comment,
      });
      setSubmitted(true);
      if (onSubmitted) onSubmitted();
    } catch (err: any) {
      setError(
        err?.response?.data?.message || 'Could not submit feedback right now.'
      );
    }
  };

  if (submitted) {
    return <p className="text-green-600 text-sm">Feedback submitted. Thank you!</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-2">
      <label className="block text-sm">Rating (1–5)</label>
      <select
        className="w-full border px-3 py-2 rounded"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
      >
        {[1, 2, 3, 4, 5].map((num) => (
          <option key={num} value={num}>
            {num} Star{num > 1 && 's'}
          </option>
        ))}
      </select>

      <textarea
        rows={3}
        className="w-full border px-3 py-2 rounded"
        placeholder="Optional comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit Feedback
      </button>
    </form>
  );
};

export default SessionFeedback;
