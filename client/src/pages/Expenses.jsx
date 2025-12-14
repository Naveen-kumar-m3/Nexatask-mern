import { useEffect, useState } from "react";
import { getExpenses, createExpense } from "../api/expenses";
import Layout from "../components/Layout";

export default function Expenses() {
  const token = localStorage.getItem("token");

  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("general");

  const loadExpenses = async () => {
    try {
      const res = await getExpenses(token);
      setExpenses(res.data);
    } catch (err) {
      alert("Failed to load expenses");
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const handleAddExpense = async () => {
    if (!title || !amount) {
      alert("Title and amount required");
      return;
    }

    try {
      await createExpense(token, {
        title,
        amount: Number(amount),
        category,
      });

      setTitle("");
      setAmount("");
      setCategory("general");
      loadExpenses();
    } catch (err) {
      alert("Failed to add expense");
    }
  };

  return (
  <Layout>
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Expenses</h1>

      {/* Add Expense Card */}
      <div className="bg-white rounded-xl shadow p-5 mb-6">
        <h2 className="text-lg font-medium mb-4">Add Expense</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            className="border rounded-md p-2"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="number"
            className="border rounded-md p-2"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <select
            className="border rounded-md p-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="general">General</option>
            <option value="rent">Rent</option>
            <option value="electricity">Electricity</option>
            <option value="food">Food</option>
          </select>

          <button
            className="bg-teal-500 hover:bg-teal-600 text-white rounded-md px-4 py-2"
            onClick={handleAddExpense}
          >
            Add
          </button>
        </div>
      </div>

      {/* Expense List */}
      <div className="bg-white rounded-xl shadow p-5">
        <h2 className="text-lg font-medium mb-4">Expense List</h2>

        {expenses.length === 0 && (
          <p className="text-gray-500">No expenses added yet</p>
        )}

        <div className="space-y-3">
          {expenses.map((e) => (
            <div
              key={e._id}
              className="flex justify-between items-center border rounded-md p-3"
            >
              <div>
                <div className="font-medium">{e.title}</div>
                <div className="text-sm text-gray-500">{e.category}</div>
              </div>

              <div className="font-semibold text-teal-600">
                ₹{e.amount}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Layout>
);
}