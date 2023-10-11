import { categoryRender } from "./app/category";
import { productRender } from "./app/product";
import { products } from "./core/variable";
import { categories } from "./core/variable";

export class Shop {
    preRender(){
        categoryRender(categories)
        productRender(products)
    }

    listener(){

    }

    init(){
        console.log("Shop Works");
        this.preRender()
        this.listener()
    }

}