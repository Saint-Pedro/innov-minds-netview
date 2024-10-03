import dynamic from 'next/dynamic'

const NetworkDashboard = dynamic(() => import('../components/NetworkDashboard'), { ssr: false })
const AnomalyDetection = dynamic(() => import('../components/AnomalyDetection'), { ssr: false })

export default function Home() {
  return (
    <main className="p-4">
      <h1 className="text-3xl font-bold mb-4">Tableau de bord réseau innovant</h1>
      <NetworkDashboard />
      <AnomalyDetection />
    </main>
  );
}