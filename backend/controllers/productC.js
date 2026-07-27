import { redis } from "../lib/redis.js";
import cloudinary from "../lib/cloudinary.js"; 
import Product from "../models/productM.js";


export const getAllProducts = async (req , res) => {
    try {
        const products = await Product.find({});
        res.json({products});
    } catch (error) {
        console.log("Error in getAllProducts");
        res.status(500).json({message:"Server Error",error:error.message});
    }
}

export const getFeaturedProducts = async (req, res) => {
	try {
		const cachedProducts = await redis.get("featured_products");

		if (cachedProducts) {
    return res.json(cachedProducts);
}

		const featuredProducts = await Product.find({
			isFeatured: true,
		}).lean();

		console.log("Fetched from MongoDB:", featuredProducts);

		await redis.set(
			"featured_products",
			JSON.stringify(featuredProducts)
		);

		return res.json(featuredProducts);
	} catch (error) {
		console.error("getFeaturedProducts Error:");
		console.error(error);

		return res.status(500).json({
			message: error.message,
		});
	}
};

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, image, category } = req.body;

        let cloudinaryResponse = null;

        if (image) {
            cloudinaryResponse = await cloudinary.uploader.upload(image, {
                folder: "products",
            });
        }

        const product = await Product.create({
            name,
            description,
            price,
            image: cloudinaryResponse?.secure_url || "",
            category,
        });

        res.status(201).json(product);
    } catch (error) {
        console.log("Error in createProduct controller:", error.message);

        res.status(500).json({
            message: "Server Error",
            error: error.message,
        });
    }
};

export const deleteProduct = async ( req , res ) => {
    try {
        const product = await Product.findById(req.params.id)

        if(!product) {
            return res.status(404).json({message:"product not found"});
        }

        if(product.image){
            const publicId = product.image.split("/").pop().split("/")[0];
            try {
                await cloudinary.uploader.destroy(`products/${publicId}`);
                console.log("deleted image from cloudinary");
            } catch (error) {
                console.log("Error deleting cloudinary image",error);
            }
        }
        await Product.findByIdAndDelete(req.params.id);
        res.json({message:"Product deleted Successfully"});
    } catch (error) {
        console.log("Error in deletedProduct cloudinary");
        res.status(500).json({message:"Server Error" , error:error.message});
    }
};

export const getRecommendedProducts = async ( req , res ) => {
    try {
        const products = await  Product.aggregate([
            {
                $sample:{ size : 3 },
            },
            {
                $project:{
                    _id:1,
                    name:1,
                    description:1,
                    image:1,
                    price:1
                },
            },
        ])

        res.json(products);
    } catch (error) {
        console.log("Error in getRecommendation controller");
        res.status(500).json({ message:" Server Error" , error: error.message});
    }
};

export const getProductsByCategory = async (req , res) => {
    const { category } = req.params;
    try {
        const products = await Product.find({category});
        res.json({
    products,
        });
    } catch (error) {
        console.log("Error in getProductsByCategory in controller",error.message);
        res.status(500).json({ message:"Server Error" , error:error.message});
    }
}

export const toggleFeaturedProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		if (product) {
			product.isFeatured = !product.isFeatured;
			const updatedProduct = await product.save();
			await updateFeaturedProductsCache();
			res.json(updatedProduct);
		} else {
			res.status(404).json({ message: "Product not found" });
		}
	} catch (error) {
		console.log("Error in toggleFeaturedProduct controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

async function updateFeaturedProductsCache() {
	try {
		// The lean() method  is used to return plain JavaScript objects instead of full Mongoose documents. This can significantly improve performance

		const featuredProducts = await Product.find({ isFeatured: true }).lean();
		await redis.set("featured_products", JSON.stringify(featuredProducts));
	} catch (error) {
		console.log("error in update cache function");
	}
}
