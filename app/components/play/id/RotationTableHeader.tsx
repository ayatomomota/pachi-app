type Props = {
  header: string;
};

export default function RotationTableHeader({ header }: Props) {
  return (
    <th className="border-b p-2 font-semibold text-center text-sm">{header}</th>
  );
}
