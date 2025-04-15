import AllProduct from "@/components/product/all_product";

export default function Home() {
  return (
    <div className="flex flex-col gap-y-4">
      <span className="text-3xl text-zinc-800 font-medium">Каталог товаров</span>
      <AllProduct/>
    </div>
  )
}
