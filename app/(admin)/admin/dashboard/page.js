import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";



const Dashboard = () => {
  const breadcrumbItems = [

    { label: "Dashboard", href: "/admin/dashboard" },

  ];
  return (
    <div >
      <Breadcrumb items={breadcrumbItems} />
      <div className="mt-6">
        <h1 className="text-2xl font-bold">Profile Page</h1>
        <p className="mt-2 text-gray-600">
          This is the Dashboard page content. The breadcrumb above shows the navigation path.
        </p>
        <div className="mt-10 flex  lg:flex-nowrap flex-wrap gap-10">
          <Card className={"rounded-lg lg:w-[70%] w-full p-0"}>
            <CardHeader className={"py-3"}>
              <div className="flex justify-between items-center">
                <span>Order OverView</span>
                <Button>
                  <Link href={"/"}>View All</Link>
                </Button>
              </div>
            </CardHeader>
          </Card>
          <Card className={"rounded-lg lg:w-[30%] w-full p-0"}>
            <CardHeader className={"py-3"}>
              <div className="flex justify-between items-center">
                <span>Order Status</span>
                <Button>
                  <Link href={"/"}>View All</Link>
                </Button>
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Dashboard


