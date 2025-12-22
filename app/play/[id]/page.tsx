import RotationInfo from "@/app/components/play/id/RotationInfo";
import RotationTable from "@/app/components/play/id/RotationTable";

type Props = {
  params: {
    id: string;
  };
};

export default async function PlayEditPage({ params }: Props) {
  const { id } = await params;
  return (
    <div>
      <RotationInfo playId={id} />
      <RotationTable playId={id} />
    </div>
  );
}
