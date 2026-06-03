'use client';

import DOMPurify from 'dompurify';
import type { Comment } from "@/lib/types";

export function CommentList({ comments }: { comments: Comment[] }) {
  return (
    <div className="space-y-3">
      {comments.map((comment) => (
        <article key={comment.id} className="rounded border border-slate-200 bg-white p-3">
          <p className="mb-2 text-xs text-slate-500">{comment.user?.displayName || `Utilisateur ${comment.userId}`}</p>
          <div className="text-sm text-slate-800" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(comment.content) }} />
        </article>
      ))}
    </div>
  );
}
