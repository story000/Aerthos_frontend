"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import NavBar from "../../components/Navbar/navBar";
import Footer from "../../components/Footer/foot";

// 为了示例，直接在此文件定义一个 Sidebar 组件
function Sidebar({
  activeStep,
  goToStep,
}: {
  activeStep: number;
  goToStep: (step: number) => void;
}) {
  return (
    <div className="w-64 h-screen flex flex-col border-r bg-white">
      {/* 顶部品牌 */}
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold tracking-wide">Aerthos</h1>
      </div>


      {/* 主菜单 */}
      <nav className="p-6 flex-1">
        <ul className="space-y-4">
          <li>
            <a
              href="#"
              className="flex items-center text-gray-700 hover:text-blue-600"
            >
              <span className="ml-2">Overview</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center text-gray-700 hover:text-blue-600"
            >
              <span className="ml-2">Imports</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center text-gray-700 hover:text-blue-600"
            >
              <span className="ml-2">Suppliers</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center text-gray-700 hover:text-blue-600"
            >
              <span className="ml-2">Reports</span>
            </a>
          </li>
        </ul>

       
      </nav>

      {/* 底部操作菜单 */}
      <div className="p-6 border-t">
        <ul className="space-y-4">
          <li>
            <a
              href="#"
              className="flex items-center text-gray-700 hover:text-blue-600"
            >
              <span className="ml-2">Switch Organization</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center text-gray-700 hover:text-blue-600"
            >
              <span className="ml-2">Settings</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center text-gray-700 hover:text-blue-600"
            >
              <span className="ml-2">Profile</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center text-gray-700 hover:text-blue-600"
            >
              <span className="ml-2">Logout</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default function ImportPage() {
  // 控制当前步骤
  const [activeStep, setActiveStep] = useState(1);

  // 表单数据
  const [infoData, setInfoData] = useState({
    poNumber: "",
    importName: "",
    importDate: "",
    departurePort: "",
    arrivalPort: "",
  });
  const [linesData, setLinesData] = useState({
    product: "",
    quantity: "",
  });

  // 切换步骤
  const goToStep = (step: number) => {
    setActiveStep(step);
  };

  // 第一页：Import Information
  const handleInfoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInfoData({
      ...infoData,
      [e.target.id]: e.target.value,
    });
  };

  const handleInfoNext = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      infoData.poNumber === "" ||
      infoData.importName === "" ||
      infoData.importDate === ""
    ) {
      alert("Please fill in all required fields");
      return;
    }
    console.log("Import Information Data:", infoData);
    setActiveStep(2);
  };

  // 第二页：Import Lines
  const handleLinesSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Lines Data:", linesData);
    setActiveStep(3);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex flex-1">
        {/* 左侧侧边栏 */}
        <Sidebar activeStep={activeStep} goToStep={goToStep} />

        {/* 右侧内容区 */}
        <main className="flex-1 p-8">

          {/* 这里加一个小标题，表示导入流程步骤 */}
          <h2 className="text-lg font-bold mt-8 mb-4">Import Steps</h2>
          <ol className="space-y-4">
            <li
              className="flex items-center cursor-pointer"
              onClick={() => goToStep(1)}
            >
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 mr-2 ${
                  activeStep === 1
                    ? "border-blue-500 text-blue-500"
                    : "border-gray-300 text-gray-400"
                }`}
              >
                1
              </div>
              <span
                className={`${
                  activeStep === 1 ? "text-black" : "text-gray-500"
                }`}
              >
                Import Information
              </span>
            </li>

            <li
              className="flex items-center cursor-pointer"
              onClick={() => goToStep(2)}
            >
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 mr-2 ${
                  activeStep === 2
                    ? "border-blue-500 text-blue-500"
                    : "border-gray-300 text-gray-400"
                }`}
              >
                2
              </div>
              <span
                className={`${
                  activeStep === 2 ? "text-black" : "text-gray-500"
                }`}
              >
                Import Lines
              </span>
            </li>

            <li
              className="flex items-center cursor-pointer"
              onClick={() => goToStep(3)}
            >
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 mr-2 ${
                  activeStep === 3
                    ? "border-blue-500 text-blue-500"
                    : "border-gray-300 text-gray-400"
                }`}
              >
                3
              </div>
              <span
                className={`${
                  activeStep === 3 ? "text-black" : "text-gray-500"
                }`}
              >
                Cbam Check
              </span>
            </li>
          </ol>
          
          {activeStep === 1 && (
            <div className="p-4 bg-white shadow rounded">
              <h2 className="text-2xl font-bold mb-4">Import Information</h2>
              <form onSubmit={handleInfoNext}>
                <div className="mb-4">
                  <label
                    htmlFor="poNumber"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    Purchase Order Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="poNumber"
                    placeholder="PO83499949"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={infoData.poNumber}
                    onChange={handleInfoChange}
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="importName"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    Import Name / Description{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="importName"
                    placeholder="20240720 Aluminum Import Shenzhen"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={infoData.importName}
                    onChange={handleInfoChange}
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="importDate"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    Import Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="importDate"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={infoData.importDate}
                    onChange={handleInfoChange}
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="departurePort"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    Departure Port (UNLOCODE)
                  </label>
                  <input
                    type="text"
                    id="departurePort"
                    placeholder="NLRTM"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={infoData.departurePort}
                    onChange={handleInfoChange}
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="arrivalPort"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    Arrival Port (UNLOCODE)
                  </label>
                  <input
                    type="text"
                    id="arrivalPort"
                    placeholder="CNNBG"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={infoData.arrivalPort}
                    onChange={handleInfoChange}
                  />
                </div>

                <div className="text-right">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Next
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeStep === 2 && (
            <div className="p-4 bg-white shadow rounded">
              <h2 className="text-2xl font-bold mb-4">Import Lines</h2>
              <form onSubmit={handleLinesSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="product"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    Product
                  </label>
                  <input
                    type="text"
                    id="product"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={linesData.product}
                    onChange={(e) =>
                      setLinesData({ ...linesData, product: e.target.value })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="quantity"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    Quantity
                  </label>
                  <input
                    type="text"
                    id="quantity"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={linesData.quantity}
                    onChange={(e) =>
                      setLinesData({ ...linesData, quantity: e.target.value })
                    }
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Next
                </button>
              </form>
            </div>
          )}

          {activeStep === 3 && (
            <div className="p-4 bg-white shadow rounded">
              <h2 className="text-2xl font-bold mb-4">Cbam Check</h2>
              <p>This is the CBAM Check section. You can add relevant fields or data here...</p>
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}
