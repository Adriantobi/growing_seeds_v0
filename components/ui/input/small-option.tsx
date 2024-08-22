interface SmallOptionProps {
  title: string;
  description: string;
  imageUrl: string;
  onChange: () => void;
}
export function SmallOption({
  title,
  description,
  imageUrl,
  onChange,
}: SmallOptionProps) {
  return (
    <div>
      <h1>Small Option</h1>
    </div>
  );
}
