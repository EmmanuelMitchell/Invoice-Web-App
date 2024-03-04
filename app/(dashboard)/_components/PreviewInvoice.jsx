import React from "react";
import { format } from "date-fns";

export default function PreviewInvoice({ values }) {
  return (
    <>
      <div className="sticky top-5 border border-slate-800 p-4 m-4 rounded-lg scale-95">
        <article className="flex flex-col items-end justify-end p-4 text-slate-700">
          <h2 className="text-2xl font-bold text-slate-800">{values.name}</h2>
          <p>{values.email}</p>
          <p>{values.address}</p>
          <p>{values.phoneNumber}</p>
        </article>

        <article className="">
          <h2 className="text-2xl font-bold text-slate-800">
            {values.clientName}
          </h2>
          <p>{values.clientEmail}</p>
          <p>{values.clientAddress}</p>
        </article>
        {/* Invoice Details */}
        <article className="flex flex-col justify-end items-end">
          <h2 className="text-2xl font-bold text-slate-800">Invoice Details</h2>
          <p className="">
            Invoice date:
            {values.invoiceDate &&
              format(new Date(values.invoiceDate), "do MMMM yyyy")}
          </p>
          <p className="">
            Due date:
            {values.dueDate && format(new Date(values.dueDate), "do MMMM yyyy")}
          </p>
        </article>

        <article className="mb-8 mt-4">
          <table width="100%">
            <thead>
              <tr className="bg-teal-800 text-white p-4">
                <td>Item Name</td>
                <td>Quantity</td>
                <td>Price</td>
                <td>Total</td>
              </tr>
            </thead>
            <tbody>
              {values.items.map((item) => (
                <tr key={item.id}>
                  <td className="text-slate-800 text-sm">{item.item}</td>
                  <td className="text-slate-800 text-sm">{item.quantity}</td>
                  <td className="text-slate-800 text-sm">{item.price}</td>
                  <td className="text-slate-800 text-sm">{item.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>

        <article>
          <h2 className="text-slate-800 font-bold">Ksv:{values.totalAmount}</h2>
        </article>
        {/* Additional Note */}
        <article className="pb-8">
          <h2 className="text-2xl font-bold text-slate-800">AdditionalNote</h2>
          <p className="text-muted-foreground w-1 text-xs">
            {values.aditionalNote}
          </p>
        </article>

        {/* Invoice Footer */}
        <article className="border-t border-slate-950 py-2">
          <ul className="flex flex-wrap items-center justify-center gap-4">
            <li className="text-slate-600 text-sm">
              <span className="text-slate-900 font-bold">Email:</span>
              {values.email}
            </li>
            <li className="text-slate-600 text-sm">
              <span className="text-slate-900 font-bold">
                Bank Account Holder:
              </span>
              {values.name}
            </li>
            <li lassName="text-slate-600 text-sm">
              <span className="text-slate-900 font-bold">Bank Name:</span>
              {values.email}
            </li>

            <li className="text-slate-600 text-sm">
              <span className="text-slate-900 font-bold">
                Bank Account Number:
              </span>
              {values.bankAccountNumber}
            </li>
            <li className="text-slate-600 text-sm">
              <span className="text-slate-900 font-bold">Phone Number:</span>
              {values.phoneNumber}
            </li>
          </ul>
        </article>
      </div>
    </>
  );
}
