import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, ClipboardCheck, Bug, Database, Paintbrush, X, Smartphone, Shield } from 'lucide-react';

interface ChangelogEntry {
  date: string;
  title: string;
  type: 'feature' | 'bugfix' | 'data' | 'visual' | 'mobile';
  description: string;
  author?: string;
}

const changelogData: ChangelogEntry[] = [
  {
    date: '28/05/2025',
    title: 'Melhorias Críticas de Interface Mobile',
    type: 'mobile',
    description: 'Corrigidos problemas de layout mobile, melhorada responsividade da sidebar, botões com tamanho adequado para toque e espaçamento otimizado.',
    author: '@schjneiderr'
  },
  {
    date: '27/05/2025',
    title: 'Sistema de Cadastro de Usuários Implementado',
    type: 'feature',
    description: 'Implementação completa do sistema de registro e login com salvamento local das credenciais e integração com Google Login.',
    author: '@schjneiderr'
  },
  {
    date: '27/05/2025',
    title: 'Melhorias de Responsividade Mobile',
    type: 'mobile',
    description: 'Design mobile-first implementado com breakpoints responsivos, botões maiores e melhor experiência de toque.',
    author: '@schjneiderr'
  },
  {
    date: '27/05/2025',
    title: 'Sistema de Validação em Tempo Real',
    type: 'feature',
    description: 'Adicionada validação em tempo real nos formulários com feedback visual e mensagens de erro melhoradas.',
    author: '@schjneiderr'
  },
  {
    date: '27/05/2025',
    title: 'Função "Mostrar Senha" Implementada',
    type: 'visual',
    description: 'Adicionado botão para visualizar/ocultar senha nos campos de login e registro com ícone de olho.',
    author: '@schjneiderr'
  },
  {
    date: '27/05/2025',
    title: 'Integração com Google Login',
    type: 'feature',
    description: 'Implementação do login com Google através de botão dedicado e integração com AuthContext.',
    author: '@schjneiderr'
  },
  {
    date: '21/05/2025',
    title: 'Adição de Painel Admin',
    type: 'feature',
    description: 'Implementação de painel administrativo com gerenciamento de usuários e configurações do sistema.'
  },
  {
    date: '21/05/2025',
    title: 'Novas Páginas Institucionais',
    type: 'feature',
    description: 'Adicionadas páginas de Início, Sobre, Serviços e Contato para melhorar a experiência do usuário.'
  },
  {
    date: '21/05/2025',
    title: 'Mudança de Nome para Spectra',
    type: 'visual',
    description: 'Sistema renomeado para Spectra, com atualização da identidade visual e novas cores.'
  },
  {
    date: '21/05/2025',
    title: 'Lançamento do Modo Escuro',
    type: 'visual',
    description: 'Implementação do modo escuro em toda a aplicação, proporcionando uma experiência visual mais confortável.'
  },
  {
    date: '20/05/2025',
    title: 'Correção do Sistema de Arrastar e Soltar',
    type: 'bugfix',
    description: 'Resolvido problema que impedia o arrastar e soltar de tarefas entre colunas em determinadas situações.'
  },
  {
    date: '19/05/2025',
    title: 'Integração com Banco de Dados NoSQL',
    type: 'data',
    description: 'Adicionado suporte para armazenamento de tarefas em banco NoSQL, melhorando a performance e a escalabilidade.'
  },
  {
    date: '18/05/2025',
    title: 'Previsão de Prazos com IA',
    type: 'feature',
    description: 'Nova funcionalidade de previsão inteligente de prazos baseada no histórico de tarefas similares.'
  },
  {
    date: '17/05/2025',
    title: 'Melhorias Visuais nos Cartões',
    type: 'visual',
    description: 'Redesenho dos cartões de tarefas com novas animações e indicadores visuais de prioridade.'
  },
  {
    date: '16/05/2025',
    title: 'Correção na Autenticação',
    type: 'bugfix',
    description: 'Resolvido problema que causava logout inesperado após uma hora de inatividade.'
  },
  {
    date: '15/05/2025',
    title: 'Otimização de Banco de Dados',
    type: 'data',
    description: 'Implementadas novas queries otimizadas para melhorar o tempo de resposta em quadros com muitas tarefas.'
  },
  {
    date: '14/05/2025',
    title: 'Lançamento do Assistente Virtual',
    type: 'feature',
    description: 'Novo assistente virtual com suporte a perguntas sobre o uso do sistema e gerenciamento de tarefas.'
  }
];

const ChangelogNotes = () => {
  const [isOpen, setIsOpen] = useState(false);

  const getIconForType = (type: string) => {
    switch(type) {
      case 'feature': return <ClipboardCheck className="h-4 w-4 text-green-500" />;
      case 'bugfix': return <Bug className="h-4 w-4 text-red-500" />;
      case 'data': return <Database className="h-4 w-4 text-blue-500" />;
      case 'visual': return <Paintbrush className="h-4 w-4 text-purple-500" />;
      case 'mobile': return <Smartphone className="h-4 w-4 text-orange-500" />;
      default: return <ClipboardCheck className="h-4 w-4" />;
    }
  };

  const getLabelForType = (type: string) => {
    switch(type) {
      case 'feature': return 'Novo Recurso';
      case 'bugfix': return 'Correção de Bug';
      case 'data': return 'Banco de Dados';
      case 'visual': return 'Visual';
      case 'mobile': return 'Mobile';
      default: return 'Atualização';
    }
  };

  if (!isOpen) {
    return (
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 z-50 flex items-center gap-2 bg-secondary/80 backdrop-blur-sm h-11 px-3"
      >
        <Bell className="h-4 w-4 text-phantom-500" />
        <span className="hidden sm:inline">Atualizações</span>
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-20 right-4 w-80 max-w-[calc(100vw-2rem)] z-50 shadow-lg animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm flex items-center gap-2">
            <Bell className="h-4 w-4 text-phantom-500" />
            Registro de Atualizações
          </CardTitle>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription className="text-xs">
          Acompanhe as melhorias e correções mais recentes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-64 pr-4">
          <div className="space-y-4">
            {changelogData.map((entry, index) => (
              <div key={index} className="border-l-2 pl-4 py-1 border-phantom-500/50 relative">
                <div className="absolute -left-1.5 top-1.5 p-1 bg-background rounded-full">
                  {getIconForType(entry.type)}
                </div>
                <h4 className="font-medium text-sm">{entry.title}</h4>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1 flex-wrap">
                  <span>{entry.date}</span>
                  <span className="bg-secondary text-xs px-2 py-0.5 rounded-full">
                    {getLabelForType(entry.type)}
                  </span>
                  {entry.author && (
                    <span className="bg-phantom-500/20 text-phantom-500 text-xs px-2 py-0.5 rounded-full">
                      {entry.author}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{entry.description}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ChangelogNotes;
