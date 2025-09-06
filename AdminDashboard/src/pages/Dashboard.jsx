import Layout from "../components/Layout";
import Widget from "../components/widget";
import { SalesChart, TopProductsChart, CouponUsageChart } from "../components/Charts";

// Dummy data (replace with API later)
const salesData = [
  { date: "Sep 1", revenue: 2000 },
  { date: "Sep 2", revenue: 3500 },
  { date: "Sep 3", revenue: 1800 },
  { date: "Sep 4", revenue: 4000 },
];
const productsData = [
  { name: "Scrapbook", sales: 120 },
  { name: "Bookmark A", sales: 80 },
  { name: "Bookmark B", sales: 50 },
];
const couponData = [
  { code: "WELCOME10", used: 20 },
  { code: "FESTIVE20", used: 15 },
];

export default function Dashboard() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Widgets */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <Widget title="Total Sales" value="₹85,000" subtitle="This month" />
        <Widget title="Orders" value="320" subtitle="Completed" />
        <Widget title="Customers" value="150" subtitle="Active" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        <SalesChart data={salesData} />
        <TopProductsChart data={productsData} />
        <CouponUsageChart data={couponData} />
      </div>
    </Layout>
  );
}
