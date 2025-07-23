import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, List } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const StatCard = ({ title, value, icon: Icon, iconColor, gradient, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
  >
    <Card className={`backdrop-blur-lg ${gradient} border-white/20`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm font-medium text-white/80`}>{title}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
          </div>
          <Icon className={`h-8 w-8 ${iconColor}`} />
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const Statistics = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <StatCard
        title="Total de Registros"
        value={stats.total}
        icon={List}
        iconColor="text-blue-300"
        gradient="bg-blue-500/20"
        delay={0.3}
      />
      <StatCard
        title="Produção Máxima Média"
        value={stats.avgMax.toFixed(1)}
        icon={TrendingUp}
        iconColor="text-green-300"
        gradient="bg-green-500/20"
        delay={0.35}
      />
    </div>
  );
};

export default Statistics;