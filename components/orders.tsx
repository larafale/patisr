

"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"


import { toast } from 'sonner'
import { Separator } from "@/components/ui/separator"
import { CartItem, Category, Product } from "@/lib/specs"
import { clientError } from "@/lib/utils-client"
import { cn, formatPrice } from "@/lib/utils"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import { Input } from "@/components/ui/input"




type Props = {
    categories: Category[],
    products: Product[],
}

export default function OrderNew({ categories = [], products = [] }: Props) {

    const [view, setView] = React.useState("cat")
    const [category, setCategory] = React.useState<Category>()
    const [items, setItems] = React.useState<CartItem[]>([])

    const addItem = (item: CartItem) => setItems([{ ...item, qty: 1 }, ...items])
    const deleteItem = (item: CartItem) => setItems(items.filter(i => i.id != item.id))

    return (<div className="grid gap-4 grid-cols-2">
        <div>
            {!category && <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {categories.map((cat, index) => {
                    const name = cat.name.charAt(0).toUpperCase()
                        + cat.name.slice(1)
                    return (<Image key={index} width="0"
                        alt={name}
                        height="0"
                        sizes="100vw"
                        className="w-full h-auto rounded-lg shadow dark:shadow-gray-800 cursor-pointer"
                        src={`https://fakeimg.pl/350x200/?text=${name}`}
                        onClick={() => setCategory(cat)}
                    />
                    )
                })}

            </div>}
            {category && <ProductList
                category={category}
                setCategory={setCategory}
                products={products}
                addItem={addItem}

            />}
        </div>
        <div><Cart items={items} deleteItem={deleteItem} /></div>
    </div>)
}

type ProductListProp = {
    products: Product[]
    category: Category,
    setCategory: any,
    addItem: any,
}


const ProductList = ({ category, setCategory, addItem, products = [] }: ProductListProp) => {
    const list = products.filter(p => p.categoryId == category.id)
    return (<div className="border shadow rounded px-4 py-6 sm:px-6">
        <div>
            <Button onClick={() => setCategory()} variant="outline" className="mb-4">{'<'}</Button>
            <span className="capitalize ml-4 font-bold">{category.name}</span>
        </div>

        <div className="flex flex-col">
            {list.map((product, index) => {
                return <div key={index} className="flex justify-between items-center py-3 border-t">
                    <div className="capitalize">{product.name} - {formatPrice(product.price)}</div>
                    <Button onClick={() => addItem(product)} variant="outline">Ajouter</Button>
                </div>
            })}
        </div>
    </div>)
}

type CartProp = {
    items: CartItem[],
    deleteItem: any,
}

const Cart = ({ items = [], deleteItem }: CartProp) => {
    return (<div className="flex h-full flex-col border shadow rounded">
        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">

            {!items.length && <div className="text-center"><h4 >Panier vide</h4></div>}

            {!!items.length && <ul role="list" className="-my-6 divide-y divide-gray-200">
                {items.map((item, index) => {
                    return (<li key={index} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg" alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." className="h-full w-full object-cover object-center" />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                            <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>
                                        <a href="#">{item.name}</a>
                                    </h3>
                                    <p className="ml-4">{formatPrice(item.price)}</p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">Salmon</p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                                <Input onChange={() => { }} className="w-20" type="number" value={item.qty} />
                                <Button onClick={() => deleteItem(item)} size="sm" variant="outline">x</Button>
                            </div>
                        </div>
                    </li>)
                })}

            </ul>}

        </div>
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Total</p>
                <p>$262.00</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
            <Button className="mt-6 mx-auto">Valider</Button>
        </div>
    </div >)
}