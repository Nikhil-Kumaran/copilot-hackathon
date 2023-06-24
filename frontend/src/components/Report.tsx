import { useGetTransactions } from "@/hooks/data-fetching/useGetTransactions";
import { useUser } from "@/hooks/data-fetching/useUser";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie } from "recharts";

function convertData(inputData) {
  const convertedData = inputData?.map((item) => {
    const { categories, amount, type } = item;
    const name = categories;
    const expense = type === "expense" ? amount : 0;
    const income = type === "income" ? amount : 0;

    return {
      name,
      expense,
      income
    };
  });

  return convertedData;
}

export function Reports() {
  const { data: user } = useUser();
  const { data, isLoading, error, mutate } = useGetTransactions(user?.username);

  const parsedData = data?.data?.map((d) => ({ ...d.attributes, id: d.id }));

  const expenses = parsedData?.filter((data) => data?.type === "expense");

  const categoriesData = convertData(expenses || []);

  const groupedData = expenses?.reduce((result, entry) => {
    const { categories, amount } = entry;
    if (!result[categories]) {
      result[categories] = 0;
    }
    result[categories] += amount;
    return result;
  }, {});

  // Convert the grouped data into an array of objects with name and amount properties
  const chartData = Object.keys(groupedData).map((categories) => ({
    name: categories,
    amount: groupedData[categories]
  }));

  const totalIncome = parsedData?.filter((data) => data?.type === "income")?.reduce((acc, data) => acc + data.amount, 0);

  const totalExpense = parsedData?.filter((data) => data?.type === "expense")?.reduce((acc, data) => acc + data.amount, 0);

  const pieChartData = [
    { name: "Income", value: totalIncome },
    { name: "Expense", value: totalExpense }
  ];

  const COLORS = ["#0088FE", "#FF8042"];

  return (
    <div>
      <h1>Bar chart of expesnes in different categories</h1>

      <BarChart width={1000} height={400} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="amount" fill="#8884d8" />
      </BarChart>

      <h1>Pie chart to show income vs expense</h1>

      {/* <ResponsiveContainer width="100%" height="100%"> */}
      <PieChart width={1000} height={500}>
        <Pie dataKey="value" isAnimationActive={false} data={pieChartData} cx="30%" cy="50%" innerRadius={0} outerRadius="80%" fill="#8884d8" label>
          {pieChartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      {/* </ResponsiveContainer> */}
    </div>
  );
}
