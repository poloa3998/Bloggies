import { DateTime } from "luxon";
import twas from "twas";
const Comment = ({ username, content, published }) => {
  published = DateTime.fromISO(published);
  return (
    <div className="text-sm max-w-lg border-b border-solid border-neutral-200 shadow-sm">
      <div className="flex items-center gap-2">
        <p>{username}</p>
        <p>{twas(published)}</p>
      </div>
      <p>{content}</p>
    </div>
  );
};

export default Comment;
