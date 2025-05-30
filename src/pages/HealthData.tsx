import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Mock数据
const devices = [
  { deviceName: "智能手环", status: true, lastSync: "2025-05-30 10:30" },
  { deviceName: "血压计", status: false, lastSync: "2025-05-28 15:20" },
  { deviceName: "血糖仪", status: true, lastSync: "2025-05-30 08:45" },
];

const healthData = [
  { date: "05-24", heartRate: 72, bloodOxygen: 98, steps: 8432 },
  { date: "05-25", heartRate: 75, bloodOxygen: 97, steps: 7654 },
  { date: "05-26", heartRate: 68, bloodOxygen: 99, steps: 9231 },
  { date: "05-27", heartRate: 71, bloodOxygen: 98, steps: 8765 },
  { date: "05-28", heartRate: 74, bloodOxygen: 96, steps: 6543 },
  { date: "05-29", heartRate: 70, bloodOxygen: 97, steps: 7890 },
  { date: "05-30", heartRate: 69, bloodOxygen: 98, steps: 8123 },
];

const medicines = [
  { medicine: "阿司匹林", time: "08:00" },
  { medicine: "降压药", time: "12:00", image: "https://example.com/medicine1.jpg" },
];

const moodDiary = [
  { date: "2025-05-29", mood: "开心", voiceNote: "今天感觉很好" },
  { date: "2025-05-30", mood: "一般" },
];

export default function HealthData() {
  const [painLevel, setPainLevel] = useState(3);
  const [isRecording, setIsRecording] = useState(false);

  const handleConnectDevice = () => {
    toast.success("正在搜索附近设备...");
    // 实际项目中这里会调用设备连接API
  };

  const handleTakePhoto = () => {
    toast.info("调用相机功能");
    // 实际项目中这里会调用相机API
  };

  const handleRecordVoice = () => {
    setIsRecording(!isRecording);
    toast[isRecording ? "info" : "success"](
      isRecording ? "停止录音" : "开始录音"
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* 导航栏 - 与首页一致 */}
      <nav className="bg-[#2CB9B5] text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <i className="fa-solid fa-heartbeat text-2xl"></i>
            <span className="text-xl font-bold">智护医芯</span>
          </div>
        </div>
      </nav>

      {/* 主要内容 */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#2CB9B5] mb-6">健康数据中心</h1>
        
        {/* 设备接入与数据看板 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* 设备接入面板 */}
          <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <i className="fa-solid fa-bluetooth mr-2"></i>
              设备接入
            </h2>
            <div className="space-y-4">
              {devices.map((device) => (
                <div key={device.deviceName} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2 ${device.status ? "bg-green-500" : "bg-red-500"}`}></div>
                    <span>{device.deviceName}</span>
                  </div>
                  <span className="text-sm text-gray-500">{device.lastSync}</span>
                </div>
              ))}
            </div>
            <button
              onClick={handleConnectDevice}
              className="mt-4 w-full bg-[#2CB9B5] text-white py-2 rounded-md hover:bg-[#239b97] transition-colors"
            >
              <i className="fa-solid fa-link mr-2"></i>
              连接新设备
            </button>
          </div>

          {/* 数据看板 */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <i className="fa-solid fa-chart-line mr-2"></i>
              7天健康数据趋势
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={healthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="heartRate" stroke="#8884d8" name="心率(bpm)" />
                  <Line type="monotone" dataKey="bloodOxygen" stroke="#82ca9d" name="血氧(%)" />
                  <Line type="monotone" dataKey="steps" stroke="#ffc658" name="步数" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* 人工录入 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <i className="fa-solid fa-pen-to-square mr-2"></i>
            人工录入
          </h2>
          
          {/* 疼痛指数 */}
          <div className="mb-6 p-4 border rounded-lg">
            <h3 className="text-lg font-medium mb-3">疼痛指数评估</h3>
            <div className="flex items-center">
              <span className="mr-2">0</span>
              <input
                type="range"
                min="0"
                max="10"
                value={painLevel}
                onChange={(e) => setPainLevel(parseInt(e.target.value))}
                className="flex-grow mx-2"
              />
              <span className="ml-2">10</span>
              <span className="ml-4 font-bold text-[#2CB9B5]">{painLevel}</span>
            </div>
          </div>

          {/* 用药记录 */}
          <div className="mb-6 p-4 border rounded-lg">
            <h3 className="text-lg font-medium mb-3">用药记录</h3>
            <div className="space-y-3">
              {medicines.map((medicine, index) => (
                <div key={index} className="flex items-center justify-between p-2">
                  <div>
                    <span className="font-medium">{medicine.medicine}</span>
                    <span className="text-sm text-gray-500 ml-2">{medicine.time}</span>
                  </div>
                  {medicine.image && (
                    <img src={medicine.image} alt="药品照片" className="w-10 h-10 rounded" />
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={handleTakePhoto}
              className="mt-3 bg-[#2CB9B5] text-white px-4 py-2 rounded-md hover:bg-[#239b97] transition-colors"
            >
              <i className="fa-solid fa-camera mr-2"></i>
              拍照记录
            </button>
          </div>

          {/* 情绪日记 */}
          <div className="p-4 border rounded-lg">
            <h3 className="text-lg font-medium mb-3">情绪日记</h3>
            <div className="space-y-3">
              {moodDiary.map((mood, index) => (
                <div key={index} className="p-2 border-b">
                  <div className="flex justify-between">
                    <span className="font-medium">{mood.mood}</span>
                    <span className="text-sm text-gray-500">{mood.date}</span>
                  </div>
                  {mood.voiceNote && (
                    <p className="mt-1 text-sm text-gray-600">{mood.voiceNote}</p>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={handleRecordVoice}
              className={`mt-3 px-4 py-2 rounded-md transition-colors ${isRecording ? "bg-red-500" : "bg-[#2CB9B5]"} text-white`}
            >
              <i className={`fa-solid ${isRecording ? "fa-stop" : "fa-microphone"} mr-2`}></i>
              {isRecording ? "停止录音" : "语音记录"}
            </button>
          </div>
        </div>
      </main>

      {/* 页脚 - 与首页一致 */}
      <footer className="bg-gray-100 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2025 智护医芯健康管理平台 版权所有</p>
          <p className="mt-2">
            <i className="fa-solid fa-phone mr-2"></i>
            客服热线: 400-123-4567
          </p>
        </div>
      </footer>
    </div>
  );
}
