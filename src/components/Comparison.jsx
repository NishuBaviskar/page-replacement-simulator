
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Comparison = ({ results }) => {
  const hasResults = Object.values(results).some(r => r);

  if (!hasResults) {
    return null;
  }

  const comparisonData = Object.values(results)
    .filter(r => r)
    .map(r => ({
      name: r.name,
      Faults: r.faults,
      Hits: r.hits,
      'Hit Ratio': (r.hitRatio * 100).toFixed(2) + '%',
    }));

  const chartData = comparisonData.map(d => ({ name: d.name, Faults: d.Faults }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mt-8 space-y-8"
    >
      <motion.h2 variants={itemVariants} className="text-3xl font-bold text-center text-foreground dark:text-dark-foreground">
        Comparison Summary
      </motion.h2>

      {/* Summary Table */}
      <motion.div variants={itemVariants} className="bg-card dark:bg-dark-card p-6 rounded-lg shadow-md print-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-border dark:border-dark-border">
              <tr>
                <th className="p-4 font-semibold">Algorithm</th>
                <th className="p-4 font-semibold text-center">Page Faults</th>
                <th className="p-4 font-semibold text-center">Page Hits</th>
                <th className="p-4 font-semibold text-center">Hit Ratio</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((data, index) => (
                <tr key={data.name} className={`border-b border-border dark:border-dark-border ${index === comparisonData.length - 1 ? 'border-b-0' : ''}`}>
                  <td className="p-4 font-medium">{data.name}</td>
                  <td className="p-4 text-center text-destructive dark:text-dark-destructive font-bold text-lg">{data.Faults}</td>
                  <td className="p-4 text-center text-accent dark:text-dark-accent font-semibold">{data.Hits}</td>
                  <td className="p-4 text-center text-primary dark:text-dark-primary font-semibold">{data['Hit Ratio']}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Bar Chart */}
      <motion.div variants={itemVariants} className="bg-card dark:bg-dark-card p-6 rounded-lg shadow-md print-card">
        <h3 className="text-xl font-semibold mb-4 text-center">Page Faults Comparison</h3>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="name" stroke="var(--color-foreground)" />
              <YAxis allowDecimals={false} stroke="var(--color-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-foreground)'
                }}
              />
              <Legend />
              <Bar dataKey="Faults" fill="var(--color-destructive)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Comparison;