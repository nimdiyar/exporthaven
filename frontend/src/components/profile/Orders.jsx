import React from "react";
import { FiCheck } from "react-icons/fi";

const Orders = ({ orders, onConfirm, otherPartyLabel }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-6 text-[#353535] border-b pb-2">
        My Orders
      </h2>
      {orders.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#d9d9d9]">
            <thead className="bg-[#d9d9d9]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#353535] uppercase tracking-wider">
                  Ad Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#353535] uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#353535] uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#353535] uppercase tracking-wider">
                  {otherPartyLabel}
                </th>
                {onConfirm && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#353535] uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[#d9d9d9]">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-[#d9d9d9]">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-[#353535]">
                      {order.ad?.title || "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-[#353535]">
                      {order.quantity}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#353535]">
                    {order[otherPartyLabel.toLowerCase()]?.companyName ||
                      order[otherPartyLabel.toLowerCase()]?.name ||
                      "N/A"}
                  </td>
                  {onConfirm && order.status === "Pending" && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => onConfirm(order._id)}
                        className="inline-flex items-center px-3 py-1 bg-[#284b63] text-white rounded-md hover:bg-[#3c6e71] transition text-xs"
                      >
                        <FiCheck className="mr-1" size={12} />
                        Confirm
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center bg-[#d9d9d9] h-32 rounded-lg">
          <p className="text-[#353535]">No orders found</p>
          <p className="text-sm text-[#353535]">Your orders will appear here</p>
        </div>
      )}
    </div>
  );
};

export default Orders;
