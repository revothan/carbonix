import React, { useState } from "react";
import { Share2, ShoppingCart } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";

interface PurchaseCardProps {
  projectName: string;
  projectType: string;
  standard: string;
  vintage: number;
  availableQuantity: number;
  price: number;
  onPurchase: () => void;
  onShare: () => void;
}

const PurchaseCard: React.FC<PurchaseCardProps> = ({
  projectName,
  projectType,
  standard,
  vintage,
  availableQuantity,
  price,
  onPurchase,
  onShare
}) => {
  const [purchaseQuantity, setPurchaseQuantity] = useState<number>(1);

  const getProjectTypeLabel = (type: string): string => {
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setPurchaseQuantity(Math.min(value, availableQuantity));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{projectName}</CardTitle>
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant="outline">{getProjectTypeLabel(projectType)}</Badge>
          <Badge variant="outline">{standard}</Badge>
          <Badge variant="outline">Vintage {vintage}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-baseline justify-between">
          <span className="text-2xl font-bold">{formatCurrency(price)}</span>
          <span className="text-sm text-muted-foreground">per tonne</span>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Available</span>
            <span>{availableQuantity} tonnes</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm">Quantity:</span>
            <Input
              type="number"
              min="1"
              max={availableQuantity}
              value={purchaseQuantity}
              onChange={handleQuantityChange}
              className="w-20"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPurchaseQuantity(availableQuantity)}
            >
              Max
            </Button>
          </div>
        </div>
        
        <div className="bg-muted/50 rounded-md p-3">
          <div className="flex justify-between mb-1">
            <span>Subtotal</span>
            <span>{formatCurrency(purchaseQuantity * price)}</span>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Platform fee (2%)</span>
            <span>{formatCurrency(purchaseQuantity * price * 0.02)}</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>{formatCurrency(purchaseQuantity * price * 1.02)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button className="w-full" onClick={onPurchase}>
          <ShoppingCart className="mr-2 h-4 w-4" /> Purchase Carbon Credits
        </Button>
        <Button variant="outline" className="w-full" onClick={onShare}>
          <Share2 className="mr-2 h-4 w-4" /> Share
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PurchaseCard;