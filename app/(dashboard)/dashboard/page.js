"use client";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import React, { useEffect, useRef, useState } from "react";
import PreviewInvoice from "../_components/PreviewInvoice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Pencil, TrashIcon, XIcon } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import collect from "collect.js";
// import html2pdf from "html2pdf.js";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export default function Dashboard() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [dueDate, setDueDtae] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);

  const [isEditing, setIsEditing] = useState(false);
  const [previewInvoice, setPreviewInvoice] = useState(false);
  {
    /* Client Detials */
  }
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientAddress, setClientAddress] = useState("");

  {
    /* Item Descriptionn */
  }
  const [item, setItem] = useState("");
  const [items, setItems] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [total, setTotal] = useState("");
  const [aditionalNote, setAditionalNote] = useState("");

  // Add items
  function handleSubmite(e) {
    e.preventDefault();
    // if (items) return;
    if (!item || !quantity || !price) {
      toast.error("Please fill all the inputs");
    } else {
      const newItems = {
        id: uuidv4(),
        item,
        quantity,
        price,
        total: quantity * price,
      };
      setItems([newItems, ...items]);
      // console.log(newItems);
      setItem("");
      setQuantity("");
      setPrice("");
      toast.success("New item added");
    }
  }

  function calculatTotal() {
    setTotal(quantity * price);
  }

  useEffect(() => {
    calculatTotal();
  }, [quantity, price]);

  // ........Calculate the Total Amout of the Item inside the table..........//

  function calculatTotalAmount() {
    const allItems = items.map((item) => item.total);
    setTotalAmount(collect(allItems).sum());
  }

  useEffect(() => {
    calculatTotalAmount();
  }, [calculatTotalAmount]);

  //........deleteFunction .........//
  function handleDeleteItem(id) {
    setItems((itemDelete) => itemDelete.filter((itemD) => itemD.id !== id));
    toast.error("You have remove an item");
  }

  // ...........Edited Function..........//
  function handleEditing(id) {
    const editedStore = items.find((itemRow) => itemRow.id === id);
    setItems((itemEdite) => itemEdite.filter((editItem) => editItem.id !== id));
    setIsEditing(true);
    setItem(editedStore.item);
    setQuantity(editedStore.quantity);
    setPrice(editedStore.price);
  }
  //........Create PDF............//
  // const handleConvertToPdf = () => {
  //   const content = contentRef.current;

  //   if (content) {
  //     const pdfOptions = {
  //       margin: 10,
  //       filename: "document.pdf",
  //       image: { type: "jpeg", quality: 0.98 },
  //       html2canvas: { scale: 2 },
  //       jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  //     };

  //     html2pdf()
  //       .from(content)
  //       .set(pdfOptions)
  //       .outputPdf((pdf) => {
  //         // You can save or display the generated PDF here
  //         pdf.save(`${clientName}.pdf`);
  //       });
  //   }
  // };

  function createPDF() {
    html2PDF(page, {
      jsPDF: {
        format: "a4",
      },
      imageType: "image/jpeg",
      output: "./pdf/generate.pdf",
    });
    // const invoice = document.getElementById("pdf");
    // html2canvas(invoice, {
    //   logging: true,
    //   letterRendering: 1,
    //   useCORS: true,
    // }).then((canvas) => {
    //   const imgWidth = 208;
    //   const imgHeight = (canvas.height * imgWidth) / canvas.width;
    //   const imgData = canvas.toDataURL("img/png");
    //   const pdf = new jsPDF("portrait", "mm", "a4");
    //   pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    //   pdf.save(`${clientName}.pdf`);
    // });
  }

  const invoiceValues = {
    name,
    setName,
    email,
    setEmail,
    address,
    setAddress,
    phoneNumber,
    setPhoneNumber,
    bankName,
    setBankName,
    bankAccountNumber,
    setBankAccountNumber,
    invoiceDate,
    setInvoiceDate,
    dueDate,
    setDueDtae,
    clientName,
    setClientName,
    clientEmail,
    setClientEmail,
    clientAddress,
    setClientAddress,
    item,
    setItem,
    quantity,
    setQuantity,
    items,
    setItems,
    price,
    setPrice,
    total,
    setTotal,
    aditionalNote,
    setAditionalNote,
    totalAmount,
  };
  return (
    <>
      <div className="p-4 lg:pl-48 bg-teal-800 ">
        <div className="flex items-center justify-between  ">
          <ToastContainer theme="colored" />
          {/* <button>Dashboard</button> */}

          <UserButton afterSignOutUrl="/" />
        </div>
        <h5 className="text-white font-semibold mt-5">Create Invoice</h5>
      </div>

      <section className="lg:pl-52 lg:grid lg:grid-cols-2 gap-6">
        {/* ..............Invoice Form................ */}
        <div>
          <form onSubmit={handleSubmite}>
            <h1 className="text-slate-900 font-bold text-2xl mb-8">
              Your details
            </h1>
            <div className="grid grid-cols-4 md:grid-cols-2 gap-2">
              <article className="flex flex-col">
                <label htmlFor="name" className="text-sm font-bold">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="border border-slate-700 focus:outline-none py-2 px-4"
                />
                <small>Your Name or Company Name</small>
              </article>

              <article className="flex flex-col">
                <label htmlFor="email" className="text-sm font-bold">
                  Your Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="border border-slate-700 focus:outline-none py-2 px-4"
                />
                <small>Email is Optional</small>
              </article>
            </div>
            <div className="grid grid-cols-4 md:grid-cols-2 gap-2">
              <article className="flex flex-col">
                <label htmlFor="address" className="text-sm font-bold">
                  Your Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="border border-slate-700 focus:outline-none py-2 px-4"
                />
                <small>
                  Your physical address, company address, street name, or City.
                </small>
              </article>
              <article className="flex flex-col">
                <label htmlFor="phone-number" className="text-sm font-bold">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone-number"
                  id="phone-number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Your phone-number"
                  className="border border-slate-700 focus:outline-none py-2 px-4"
                />
                <small>Your phone number or company phone number.</small>
              </article>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <article className="flex flex-col ">
                <label htmlFor="bankName" className="text-sm font-bold">
                  Bank name
                </label>
                <input
                  type="text"
                  name="bankName"
                  id="bankName"
                  placeholder="Your bank name"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="border border-slate-700 focus:outline-none py-2 px-4"
                />
              </article>

              <article className="flex flex-col ">
                <label
                  htmlFor="bankAccountNumber"
                  className="text-sm font-bold"
                >
                  Bank account number
                </label>
                <input
                  type="text"
                  name="bankAccountNumber"
                  id="bankAccountNumber"
                  placeholder="Your bank account number"
                  value={bankAccountNumber}
                  onChange={(e) => setBankAccountNumber(e.target.value)}
                  className="border border-slate-700 focus:outline-none py-2 px-4"
                />
              </article>
            </div>

            <div className="grid  grid-cols-4 md:grid-cols-2 gap-4 ">
              <article className="flex flex-col ">
                <label htmlFor="nvoice-date" className="text-sm font-bold">
                  Invoice Date
                </label>
                <input
                  type="date"
                  name="nvoice-date"
                  id="nvoice-date"
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                  placeholder="Invoice Date"
                  className="border border-slate-700 focus:outline-none py-2 px-4"
                />
              </article>
              <article className="flex flex-col">
                <label htmlFor="due-date" className="text-sm font-bold">
                  Due Date
                </label>
                <input
                  type="date"
                  name="due-date"
                  id="due-date"
                  value={dueDate}
                  onChange={(e) => setDueDtae(e.target.value)}
                  placeholder="Your phone-number"
                  className="border border-slate-700 focus:outline-none py-2 px-4"
                />
              </article>
            </div>
            {/* Client Detials */}
            <h2 className="text-slate-900 font-bold text-2xl mt-5 mb-8">
              Clinet details
            </h2>
            <div className="grid grid-cols-4 md:grid-cols-2 gap-2">
              <article className="flex flex-col">
                <label htmlFor="client-name" className="text-sm font-bold">
                  Client&apos;s name
                </label>
                <input
                  type="text"
                  name="client-name"
                  id="client-name"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Client's name"
                  className="border border-slate-700 focus:outline-none py-2 px-4"
                />
              </article>

              <article className="flex flex-col">
                <label htmlFor="client-email" className="text-sm font-bold">
                  Client email
                </label>
                <input
                  type="email"
                  name="client-email"
                  id="client-email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="Client email"
                  className="border border-slate-700 focus:outline-none py-2 px-4"
                />
                <small>Email is Optional</small>
              </article>
              <article className="flex flex-col">
                <label htmlFor="client-address" className="text-sm font-bold">
                  Client&apos;s address
                </label>
                <input
                  type="text"
                  name="client-address"
                  id="client-address"
                  value={clientAddress}
                  onChange={(e) => setClientAddress(e.target.value)}
                  placeholder="Client's address"
                  className="border border-slate-700 focus:outline-none py-2 px-4"
                />
              </article>
            </div>
            {/* Item Descriptionn */}
            <h2 className="text-slate-900 font-bold text-2xl mt-7 mb-8">
              ItemDescription
            </h2>
            <div className="grid grid-cols-4 md:grid-cols-2 gap-2">
              <article className="flex flex-col">
                <label htmlFor="item-name" className="text-sm font-bold">
                  Item descriptions
                </label>
                <input
                  type="text"
                  name="item-name"
                  id="item-name"
                  value={item}
                  onChange={(e) => setItem(e.target.value)}
                  placeholder="Item name"
                  className="border border-slate-700 focus:outline-none py-2 px-4"
                />
              </article>

              <article className="flex flex-col">
                <label htmlFor="quantity" className="text-sm font-bold">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="0"
                  className="border border-slate-700 focus:outline-none py-2 px-4"
                />
              </article>
              <article className="flex flex-col">
                <label htmlFor="price" className="text-sm font-bold">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="border border-slate-700 focus:outline-none py-2 px-4"
                />
              </article>

              <article className="flex flex-col">
                <label htmlFor="total" className="text-sm font-bold">
                  Total
                </label>
                <div>{total}</div>
              </article>
            </div>

            <div className="grid grid-col-4 md:grid-cols-2 mt-2 pt-3 pb-3">
              <Button variant="default" className="bg-teal-800">
                Add Items
              </Button>
            </div>
            {/* Display Table */}

            <div className="space-y-4">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex gap-4">
                    <p>{item.item}</p>
                    <p>{item.quantity}</p>
                    <p>{item.price}</p>
                  </div>

                  <div>
                    <ul className="flex gap-4">
                      <li>
                        <Button
                          variant="destructive"
                          onClick={() => handleDeleteItem(item.id)}
                        >
                          <TrashIcon />
                        </Button>
                      </li>
                      <li>
                        <Button
                          variant="secondary"
                          onClick={() => handleEditing(item.id)}
                        >
                          <Pencil />
                        </Button>
                      </li>
                    </ul>
                  </div>
                </article>
              ))}
            </div>
            {/*  */}
            <div className="grid grid-col-4 md:grid-cols-2">
              <article className="flex flex-col">
                <label htmlFor="additional-notes" className="text-sm font-bold">
                  Aditional Not
                </label>
                <textarea
                  name="additional-notes"
                  id="additional-notes"
                  cols="30"
                  rows="5"
                  value={aditionalNote}
                  onChange={(e) => setAditionalNote(e.target.value)}
                  placeholder="intermo"
                  className="border border-slate-700 focus:outline-none py-2 px-4"
                ></textarea>
              </article>
            </div>
          </form>
          <div className="mt-8 pb-11">
            <Button
              onClick={() => setPreviewInvoice(true)}
              className="bg-teal-800"
            >
              Preview
            </Button>
          </div>
        </div>
        {/* Invoice Preview */}
        <div>
          <PreviewInvoice values={invoiceValues} />
        </div>

        {previewInvoice && (
          <div className="fixed top-0 left-0 right-0 bottom-0 bg-slate-900 ">
            <div className="bg-white max-w-5xl mx-auto text-black rounded-lg ">
              <div className="flex justify-between p-4">
                <Button onClick={createPDF} className="bg-teal-800">
                  Download
                </Button>
                <Button
                  onClick={() => setPreviewInvoice(false)}
                  className="bg-teal-800"
                >
                  <XIcon />
                </Button>
              </div>
              <PreviewInvoice values={invoiceValues} />
            </div>
          </div>
        )}
      </section>
    </>
  );
}
