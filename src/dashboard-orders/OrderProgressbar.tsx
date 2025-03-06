import { iOrderActivity, OrderStatus } from "./Orders";
import { ProgressWithSegment } from "@/components/progressWithSegment";

const finalActivities: Partial<OrderStatus>[] = [
  "rejected",
  "cancelled",
  "completed",
];

const statusColors: Record<OrderStatus, string> = {
  created: "#3498db", // Blue
  accepted: "#2ecc71", // Green
  modified: "#f1c40f", // Yellow
  completed: "#8e44ad", // Purple
  rejected: "#e74c3c", // Red
  cancelled: "#95a5a6", // Grey
};

const ORDER_TAT = 60 * 60 * 1000; // 1 hour in milliseconds

const OrderProgressbar = ({
  orderActivities,
}: {
  orderActivities: iOrderActivity[];
}) => {
  if (orderActivities.length === 0) return null;

  const firstActivity = orderActivities[0] ?? null;
  const lastActivity = orderActivities[orderActivities.length - 1] ?? null;
  const isCompleted = finalActivities.includes(lastActivity?.status ?? "");
  const startTime = new Date(firstActivity.timestamp).getTime();
  let endTime = new Date(lastActivity.timestamp).getTime();
  // Clamp to ORDER_TAT
  if (endTime - startTime > ORDER_TAT) {
    endTime = startTime + ORDER_TAT;
  }

  // Calculate elapsed time from first activity to last
  let elapsedTime =
    new Date(lastActivity?.timestamp).getTime() -
    new Date(firstActivity?.timestamp).getTime();
  if (elapsedTime > ORDER_TAT) {
    elapsedTime = ORDER_TAT;
  }

  const new_order_tat = isCompleted ? ORDER_TAT : elapsedTime + ORDER_TAT;

  const totalDuration = isCompleted
    ? endTime - startTime
    : elapsedTime + ORDER_TAT;

  // Calculate progress percentage
  const progress = isCompleted ? 100 : (elapsedTime / new_order_tat) * 100;

  const segments = orderActivities.map((activity, index) => {
    const currentTime = new Date(activity.timestamp).getTime();
    const previousTime =
      index > 0
        ? new Date(orderActivities[index - 1].timestamp).getTime()
        : startTime;
    const activityDuration = Math.min(currentTime - previousTime, ORDER_TAT);

    // Calculate width percentage
    const widthPercentage = (activityDuration / totalDuration) * 100;

    return {
      value: widthPercentage,
      color: statusColors[activity.status],
    };
  });

  console.log("segments are ", segments);

  return <ProgressWithSegment className="min-w-36" segments={segments} />;

  return (
    <div className="relative w-full min-w-36">
      {/* Current Status Label */}
      <div className="flex justify-end">
        <p
          className="font-thin text-xs"
          style={{ color: statusColors[lastActivity?.status ?? "created"] }}
        >
          {lastActivity?.status.toUpperCase()}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="relative w-full h-3 bg-gray-200 rounded-full flex overflow-hidden">
        {orderActivities.map((activity, index) => {
          const currentTime = new Date(activity.timestamp).getTime();
          const previousTime =
            index > 0
              ? new Date(orderActivities[index - 1].timestamp).getTime()
              : startTime;
          const activityDuration = Math.min(
            currentTime - previousTime,
            ORDER_TAT
          );

          // Calculate width percentage
          const widthPercentage = (activityDuration / totalDuration) * 100;

          return (
            <div
              key={index}
              className="h-full transition-all duration-500 ease-out"
              style={{
                width: `${widthPercentage}%`,
                backgroundColor: statusColors[activity.status],
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="relative w-full">
      {/* Current Status Label */}
      <div className="text-center font-bold mb-2 text-lg">
        {lastActivity?.status.toUpperCase()}
      </div>

      {/* Progress Bar */}
      <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full transition-all duration-500 ease-out rounded-full"
          style={{
            width: `${progress}%`,
            backgroundColor: statusColors[lastActivity?.status ?? "created"],
          }}
        ></div>
      </div>

      {/* Status Markers */}
      <div className="flex justify-between mt-2">
        {orderActivities.map((activity, index) => (
          <div key={index} className="relative">
            <div
              className="w-4 h-4 rounded-full border-2"
              style={{
                backgroundColor: statusColors[activity.status],
                borderColor: statusColors[activity.status],
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderProgressbar;
