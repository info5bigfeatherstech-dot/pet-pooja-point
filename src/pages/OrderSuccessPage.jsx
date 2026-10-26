// src/pages/OrderSuccessPage.jsx
// Order confirmation page displaying delivery estimate and order details summary.

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Clock, MapPin, Store, ArrowRight, Home } from 'lucide-react';
import PageLayout from '../components/layout/PageLayout';
import { useOrder } from '../hooks/useOrder';
import CardSkeleton from '../components/common/CardSkeleton';
import ErrorState from '../components/common/ErrorState';
import { Button } from '../components/ui/button';
import { formatCurrency } from '../utils/formatters';

export default function OrderSuccessPage() {
  const { orderId } = useParams();
  const { data: order, isLoading, isError, refetch } = useOrder(orderId);

  if (isLoading) {
    return (
      <PageLayout className="pt-8 pb-16">
        <div className="max-w-xl mx-auto py-12">
          <CardSkeleton />
        </div>
      </PageLayout>
    );
  }

  if (isError || !order) {
    return (
      <PageLayout className="pt-8 pb-16">
        <div className="max-w-xl mx-auto py-12">
          <ErrorState
            title="Order not found"
            description="We couldn't retrieve this order. Please verify your order ID or check your order history."
            onRetry={refetch}
          />
        </div>
      </PageLayout>
    );
  }

  const itemCount = order.items?.reduce((sum, item) => sum + (item.qty || 1), 0) || 0;

  return (
    <PageLayout className="pt-8 pb-16">
      <div className="max-w-2xl mx-auto py-8 md:py-12">
        <div className="panel text-center">
        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center mb-4">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h1 className="text-2xl md:text-3xl font-medium text-foreground tracking-tight">
          Order placed!
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Thank you for ordering with Tablefy. We've notified the restaurant.
        </p>

        <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/60 border border-border text-xs text-muted-foreground">
          <span>Order ID:</span>
          <span className="font-mono font-medium text-foreground">{order.orderNumber || order.id}</span>
        </div>

        {/* Estimated Delivery Time */}
        <div className="mt-6 p-4 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center gap-3 text-primary">
          <Clock className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm font-medium">Estimated Delivery in 30–35 mins</span>
        </div>

        {/* Order Summary Snapshot */}
        <div className="mt-6 p-4 rounded-xl bg-background/50 border border-border text-left space-y-3">
          <div className="flex items-center gap-3 pb-3 border-b border-border">
            {order.restaurant?.image && (
              <img
                src={order.restaurant.image}
                alt={order.restaurant?.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
            )}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <Store className="w-4 h-4 text-primary flex-shrink-0" />
                <h2 className="text-sm font-medium text-foreground truncate">
                  {order.restaurant?.name}
                </h2>
              </div>
              <p className="text-xs text-muted-foreground truncate">
                {order.restaurant?.locality}
              </p>
            </div>
            <div className="text-right">
              <span className="text-sm font-medium text-foreground">
                {formatCurrency(order.bill?.grandTotal || 0)}
              </span>
              <p className="text-xs text-muted-foreground">
                {itemCount} {itemCount === 1 ? 'item' : 'items'}
              </p>
            </div>
          </div>

          {/* Delivery Address */}
          {order.address && (
            <div className="flex items-start gap-2 pt-1 text-xs text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-medium text-foreground capitalize">
                  Delivering to {order.address.label || 'Address'}:{' '}
                </span>
                <span>
                  {order.address.line1}
                  {order.address.city ? `, ${order.address.city}` : ''}
                  {order.address.pincode ? ` - ${order.address.pincode}` : ''}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            asChild
            className="w-full sm:w-auto font-medium shadow-sm hover:shadow"
          >
            <Link to={`/profile/orders/${order.id}`}>
              Track / View order
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="w-full sm:w-auto font-medium"
          >
            <Link to="/">
              <Home className="w-4 h-4 mr-1.5" />
              Back to home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  </PageLayout>
  );
}
