import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";

interface CreditType {
  id: string;
  projectName: string;
  projectType: string;
  standard: string;
  vintage: number;
  quantity: number;
  availableQuantity: number;
  imageUrl: string;
  color: string;
}

interface FormValuesType {
  quantity: number;
  pricePerUnit: number | string;
  expiresAt: string;
  description: string;
  allowPartialSales: boolean;
  minPurchaseQuantity: number;
  immediateSettlement: boolean;
}

interface FormErrorsType {
  quantity?: string;
  pricePerUnit?: string;
  minPurchaseQuantity?: string;
}

interface ListingDetailsCardProps {
  selectedCredit: CreditType;
  formValues: FormValuesType;
  formErrors: FormErrorsType;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSwitchChange: (name: string, checked: boolean) => void;
  setMaxQuantity: () => void;
}

const ListingDetailsCard: React.FC<ListingDetailsCardProps> = ({
  selectedCredit,
  formValues,
  formErrors,
  onInputChange,
  onSwitchChange,
  setMaxQuantity,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Listing Details</CardTitle>
        <CardDescription>
          Set your pricing and listing conditions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="quantity">
              Quantity (tonnes) <span className="text-destructive">*</span>
            </Label>
            <div className="flex">
              <Input
                id="quantity"
                name="quantity"
                type="number"
                value={formValues.quantity}
                onChange={onInputChange}
                min="1"
                max={selectedCredit.availableQuantity}
                className={formErrors.quantity ? "border-destructive" : ""}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="ml-2"
                onClick={setMaxQuantity}
              >
                Max
              </Button>
            </div>
            {formErrors.quantity && (
              <p className="text-sm text-destructive">{formErrors.quantity}</p>
            )}
            <p className="text-xs text-muted-foreground">
              Available: {selectedCredit.availableQuantity} tonnes
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pricePerUnit">
              Price per Tonne (IDRX) <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                Rp
              </span>
              <Input
                id="pricePerUnit"
                name="pricePerUnit"
                type="number"
                placeholder="Enter price per tonne"
                value={formValues.pricePerUnit}
                onChange={onInputChange}
                min="1000"
                className={`pl-8 ${
                  formErrors.pricePerUnit ? "border-destructive" : ""
                }`}
              />
            </div>
            {formErrors.pricePerUnit && (
              <p className="text-sm text-destructive">
                {formErrors.pricePerUnit}
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              Minimum price: Rp 1,000 per tonne
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="expiresAt">Listing Expiration</Label>
          <Input
            id="expiresAt"
            name="expiresAt"
            type="date"
            value={formValues.expiresAt}
            onChange={onInputChange}
            min={new Date().toISOString().split("T")[0]}
          />
          <p className="text-xs text-muted-foreground">
            If not specified, the listing will expire in 30 days
          </p>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-base font-medium">Advanced Options</h3>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="allowPartialSales" className="text-base">
                Allow Partial Sales
              </Label>
              <p className="text-sm text-muted-foreground">
                Let buyers purchase a portion of your listed credits
              </p>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Switch
                    id="allowPartialSales"
                    checked={formValues.allowPartialSales}
                    onCheckedChange={(checked) =>
                      onSwitchChange("allowPartialSales", checked)
                    }
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    When enabled, buyers can purchase a fraction of your total
                    listing.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {formValues.allowPartialSales && (
            <div className="space-y-2 pl-6 border-l-2 border-muted ml-2">
              <Label htmlFor="minPurchaseQuantity">
                Minimum Purchase Quantity
              </Label>
              <Input
                id="minPurchaseQuantity"
                name="minPurchaseQuantity"
                type="number"
                value={formValues.minPurchaseQuantity}
                onChange={onInputChange}
                min="1"
                max={formValues.quantity}
                className={
                  formErrors.minPurchaseQuantity ? "border-destructive" : ""
                }
              />
              {formErrors.minPurchaseQuantity && (
                <p className="text-sm text-destructive">
                  {formErrors.minPurchaseQuantity}
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                Minimum amount a buyer must purchase in a single transaction
              </p>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="immediateSettlement" className="text-base">
                Immediate Settlement
              </Label>
              <p className="text-sm text-muted-foreground">
                Credits transfer immediately upon sale completion
              </p>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Switch
                    id="immediateSettlement"
                    checked={formValues.immediateSettlement}
                    onCheckedChange={(checked) =>
                      onSwitchChange("immediateSettlement", checked)
                    }
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    When enabled, funds and credits transfer immediately upon
                    purchase.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <Label htmlFor="description">
            Additional Description (Optional)
          </Label>
          <Textarea
            id="description"
            name="description"
            value={formValues.description}
            onChange={onInputChange}
            placeholder="Add any additional details about your listing..."
            rows={4}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ListingDetailsCard;