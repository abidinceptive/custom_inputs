import { activityColors, finalActivities, statusColors } from "./data";
import { iOrderActivity } from "./Orders";
import { CustomProgress } from "@/components/CustomProgress";

const OrderProgressbar = ({
  orderActivities,
}: {
  orderActivities: iOrderActivity[];
}) => {
  if (orderActivities.length === 0) return null;

  const lastActivity = orderActivities[orderActivities.length - 1] ?? null;
  const isCompleted = finalActivities.includes(lastActivity?.status ?? "");

  const segments = orderActivities.map((activity) => {
    // if completed then each segment is of equal duration, else allocate maximum 4 segments
    const widthPercentage = isCompleted ? 100 / orderActivities.length : 25;

    return {
      value: widthPercentage,
      color: activityColors[activity.status],
    };
  });

  const totalProgress = segments.reduce(
    (acc, segment) => acc + segment.value,
    0
  );

  console.log("segments ", segments);

  return (
    <div className="w-full">
      <div className="flex justify-end">
        <p
          className="font-thin text-xs"
          style={{ color: statusColors[lastActivity?.status ?? "created"] }}
        >
          {lastActivity?.status.toUpperCase()}
        </p>
      </div>
      <CustomProgress
        containerClassName="min-w-36"
        value={totalProgress}
        indicatorClassName={activityColors[lastActivity?.status ?? "created"]}
      />
    </div>
  );
};

export default OrderProgressbar;
