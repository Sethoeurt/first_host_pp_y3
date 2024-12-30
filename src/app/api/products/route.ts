import { NextResponse } from 'next/server';
import mongoose, { Document, Schema } from 'mongoose';

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://phokukseng:BF5uFtnRsemXp510@cluster0.t3ptb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const connectDB = async (): Promise<void> => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGODB_URI);
      console.log('MongoDB connected successfully');
    }
  } catch (error) {
    console.error('MongoDB connection error:', (error as Error).message);
    throw new Error('Failed to connect to MongoDB');
  }
};

// Product Schema
interface ProductDocument extends Document {
  name: string;
  price: number;
  description: string;
  image: string;
}

const productSchema = new Schema<ProductDocument>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
}, { timestamps: true });

// Get the model, handling the case where it might already be compiled
const Product = mongoose.models.Product || mongoose.model<ProductDocument>('Product', productSchema);

// GET all products
export async function GET(): Promise<NextResponse> {
  try {
    await connectDB();
    const products = await Product.find({});
    return NextResponse.json({
      message: 'Products retrieved successfully',
      products: products
    });
  } catch (error) {
    console.error('Error in GET /api/products:', (error as Error).message);
    return NextResponse.json(
      { error: (error as Error).message || 'Error fetching products' }, 
      { status: 500 }
    );
  }
}

// POST new product
export async function POST(request: Request): Promise<NextResponse> {
  try {
    await connectDB();
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.price || !body.description || !body.image) {
      return NextResponse.json({ error: 'Missing required fields: name, price, description, image' }, { status: 400 });
    }

    const product = await Product.create(body);
    return NextResponse.json({
      message: 'Product created successfully',
      product: product
    }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/products:', (error as Error).message);
    return NextResponse.json(
      { error: (error as Error).message || 'Error creating product' }, 
      { status: 500 }
    );
  }
}

// PUT update product
export async function PUT(request: Request): Promise<NextResponse> {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    const body = await request.json();
    
    // Validate required fields
    if (!body.name && !body.price && !body.description && !body.image) {
      return NextResponse.json({ error: 'At least one field must be provided to update' }, { status: 400 });
    }

    const product = await Product.findByIdAndUpdate(id, body, { new: true });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Product updated successfully',
      product: product
    });
  } catch (error) {
    console.error('Error in PUT /api/products:', (error as Error).message);
    return NextResponse.json(
      { error: (error as Error).message || 'Error updating product' }, 
      { status: 500 }
    );
  }
}

// DELETE product
export async function DELETE(request: Request): Promise<NextResponse> {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    const product = await Product.findByIdAndDelete(id);
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    return NextResponse.json({
      message: 'Product deleted successfully',
      deletedProduct: product
    });
  } catch (error) {
    console.error('Error in DELETE /api/products:', (error as Error).message);
    return NextResponse.json(
      { error: (error as Error).message || 'Error deleting product' }, 
      { status: 500 }
    );
  }
}
