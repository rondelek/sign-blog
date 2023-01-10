type Box = {
  title: String;
  children: React.ReactNode;
};

export default function Box({ children, title }: Box) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 my-8 ">
      <h3 className="text-2xl border-b pb-4">{title}</h3>
      {children}
    </div>
  );
}
