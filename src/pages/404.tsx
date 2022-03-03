import Link from "next/link";

export default function Page404() {
  return (
    <div>
      Parece que não encontramos a página que você procurava.
      <Link href="/">Clique aqui para voltar para a home.</Link>
    </div>
  );
}
