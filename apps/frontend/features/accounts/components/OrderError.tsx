import AppErrorState from "@/shared/ui/AppErrorState";

interface OrderErrorProps {
  refetch: () => void;
}

export default function OrderError({ refetch }: OrderErrorProps) {
  return (
    <div className="border border-neutral-200 bg-white">
      <AppErrorState 
        title="Failed to load orders"
        message="There was an issue retrieving your order history. Please check your connection and try again."
        onRetry={refetch}
      />
    </div>
  );
}
