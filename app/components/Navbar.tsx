import Image from "next/image";

export default function Navbar() {
  return (
    <header className="mb-12 flex items-center justify-between px-6 py-4">
      <Image src="/logo.png" alt="logo" width={40} height={40} />
    </header>
  );
}
