import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Calendar, Package, Factory } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Filters = ({ filters, setFilters, uniqueValues }) => {
  const { uniqueYears, uniqueMonths, uniqueGroups, uniqueMachines } = uniqueValues;

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value === 'all' ? '' : value }));
  };

  const clearFilters = () => {
    setFilters({ year: '', month: '', group: '', productSearch: '', machine: '' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="bg-white/5 backdrop-blur-lg border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Filter className="h-5 w-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-companyGray flex items-center gap-2"><Calendar className="h-4 w-4" />Ano</label>
              <Select value={filters.year || 'all'} onValueChange={(value) => handleFilterChange('year', value)}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white"><SelectValue placeholder="Todos" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  {uniqueYears.map(year => <SelectItem key={year} value={year.toString()}>{year}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-companyGray">Mês</label>
              <Select value={filters.month || 'all'} onValueChange={(value) => handleFilterChange('month', value)}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white"><SelectValue placeholder="Todos" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  {uniqueMonths.map(month => <SelectItem key={month} value={month.toString()}>{new Date(2024, month - 1).toLocaleDateString('pt-BR', { month: 'long' })}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-companyGray flex items-center gap-2"><Package className="h-4 w-4" />Grupo</label>
              <Select value={filters.group || 'all'} onValueChange={(value) => handleFilterChange('group', value)}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white"><SelectValue placeholder="Todos" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  {uniqueGroups.map(group => <SelectItem key={group} value={group}>{group}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-companyGray flex items-center gap-2"><Factory className="h-4 w-4" />Máquina</label>
              <Select value={filters.machine || 'all'} onValueChange={(value) => handleFilterChange('machine', value)}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white"><SelectValue placeholder="Todas" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  {uniqueMachines.map(machine => <SelectItem key={machine} value={machine.toString()}>{machine}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-companyGray flex items-center gap-2"><Search className="h-4 w-4" />Buscar Produto</label>
              <Input
                placeholder="Nome ou código..."
                value={filters.productSearch}
                onChange={(e) => handleFilterChange('productSearch', e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
          </div>

          <Button variant="outline" onClick={clearFilters} className="border-white/20 text-white hover:bg-white/10">
            Limpar Filtros
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Filters;