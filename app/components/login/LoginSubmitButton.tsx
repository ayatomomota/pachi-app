"use client";

import { useFormStatus } from "react-dom";

type Props = {
  text: string;
  loadingText: string;
  className?: string; // 追加でクラスを渡せるようにする
};

export default function LoginSubmitButton({
  text,
  loadingText,
  className,
}: Props) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`w-full bg-blue-500 rounded-lg font-semibold py-3 text-white shadow hover:bg-blue-600 active:bg-blue-700 active:shadow-inner transition disabled:bg-blue-400 disabled:cursor-not-allowed ${className}`}
    >
      {pending ? loadingText : text}
    </button>
  );
}
