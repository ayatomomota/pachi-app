import { useFormStatus } from "react-dom";

type PropsType = {
  text: string;
  loadingText: string;
  className?: string;
  onClick?: () => void;
};

const PlaySubmitButton = ({
  text,
  loadingText,
  className,
  onClick,
}: PropsType) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={pending}
      className={`px-4 py-1 text-white rounded shadow active:scale-99 transition disabled:cursor-not-allowed ${className}`}
    >
      {pending ? loadingText : text}
    </button>
  );
};

export default PlaySubmitButton;
