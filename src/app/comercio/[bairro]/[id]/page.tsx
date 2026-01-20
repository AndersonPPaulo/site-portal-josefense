import { Metadata } from "next";
import ComercioDetails from "./content";
import { getCompanyByIdServer } from "./get-company";

const capitalize = (text?: string) => {
  if (!text) return "";
  return text
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export async function generateMetadata({
  params,
}: {
  params: Promise<any>;
}): Promise<Metadata> {
  const { id, bairro } = await params;

  const comercio = await getCompanyByIdServer(id);

  if (!comercio) {
    return {
      title: "Comércio não encontrado - Portal Josefense",
      description: "O comércio informado não foi localizado.",
    };
  }

  const imageUrl =
    comercio.company_image?.url ||
    "https://portaljosefense.com.br/images/no-img.png";

  return {
    title: `${comercio.name} - ${capitalize(bairro)} - ${capitalize(
      comercio.city,
    )} | Portal Josefense`,
    description:
      comercio.description ||
      "Informações detalhadas sobre este comércio em São José você vê aqui!.",
    openGraph: {
      title: `${capitalize(comercio.name)}, ${capitalize(
        bairro,
      )} - ${capitalize(comercio.city)} | Portal Josefense`,
      description:
        comercio.description ||
        "Descubra mais sobre este comércio em São José.",
      url: `https://portaljosefense.com.br/comercio/${bairro}/${id}`,
      siteName: "Portal Josefense",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `Imagem do comércio ${comercio.name}`,
        },
      ],
      locale: "pt_BR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${comercio.name} - ${bairro}`,
      description:
        comercio.description ||
        "Informações detalhadas sobre este comércio em São José.",
      images: [imageUrl],
    },
  };
}

export default async function ComercioPage() {
  return (
    <div className="p-4">
      <ComercioDetails />
    </div>
  );
}
