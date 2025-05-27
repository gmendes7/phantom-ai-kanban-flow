
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import GoogleLoginButton from '@/components/auth/GoogleLoginButton';
import { Eye, EyeOff, User, Mail, Lock, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Validações em tempo real
  const [validations, setValidations] = useState({
    nameValid: false,
    emailValid: false,
    passwordValid: false,
    passwordsMatch: false
  });

  const validateName = (value: string) => {
    const isValid = value.trim().length >= 2;
    setValidations(prev => ({ ...prev, nameValid: isValid }));
    return isValid;
  };

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(value);
    setValidations(prev => ({ ...prev, emailValid: isValid }));
    return isValid;
  };

  const validatePassword = (value: string) => {
    const isValid = value.length >= 6;
    setValidations(prev => ({ ...prev, passwordValid: isValid }));
    return isValid;
  };

  const validatePasswordsMatch = (pass: string, confirmPass: string) => {
    const isValid = pass === confirmPass && pass.length > 0;
    setValidations(prev => ({ ...prev, passwordsMatch: isValid }));
    return isValid;
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    validateName(value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
    validatePasswordsMatch(value, confirmPassword);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    validatePasswordsMatch(password, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validações finais
    if (!validateName(name)) {
      setError('Nome deve ter pelo menos 2 caracteres');
      return;
    }

    if (!validateEmail(email)) {
      setError('Email inválido');
      return;
    }

    if (!validatePassword(password)) {
      setError('Senha deve ter pelo menos 6 caracteres');
      return;
    }
    
    if (!validatePasswordsMatch(password, confirmPassword)) {
      setError('As senhas não coincidem');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await register(name, email, password);
      toast({
        title: "Conta criada com sucesso!",
        description: "Bem-vindo ao Phantom Kanban",
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      setError('Falha no cadastro. Tente novamente.');
      toast({
        title: "Erro no cadastro",
        description: "Não foi possível criar sua conta. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = validations.nameValid && validations.emailValid && 
                     validations.passwordValid && validations.passwordsMatch;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 flex items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-sm sm:max-w-md animate-fade-in">
        {/* Header */}
        <div className="mb-6 sm:mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gradient mb-2">Phantom Kanban</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Crie sua conta e comece a organizar</p>
        </div>
        
        <Card className="glass-panel border-0 shadow-2xl">
          <CardHeader className="pb-4 sm:pb-6">
            <CardTitle className="text-xl sm:text-2xl text-center">Cadastro</CardTitle>
            <CardDescription className="text-center text-sm sm:text-base">
              Crie uma conta ou use o Google
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 sm:space-y-5 px-4 sm:px-6">
              {/* Google Login */}
              <GoogleLoginButton className="w-full h-11 sm:h-12 text-sm sm:text-base" />
              
              {/* Divider */}
              <div className="relative my-4 sm:my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border/50" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-3 text-muted-foreground">
                    Ou crie uma conta
                  </span>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive text-center">
                  {error}
                </div>
              )}

              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">Nome Completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="Seu nome completo"
                    value={name}
                    onChange={handleNameChange}
                    className={`pl-10 h-11 sm:h-12 text-sm sm:text-base ${
                      name && (validations.nameValid ? 'border-green-500' : 'border-red-500')
                    }`}
                    required
                  />
                  {name && validations.nameValid && (
                    <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
                  )}
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={handleEmailChange}
                    className={`pl-10 h-11 sm:h-12 text-sm sm:text-base ${
                      email && (validations.emailValid ? 'border-green-500' : 'border-red-500')
                    }`}
                    required
                  />
                  {email && validations.emailValid && (
                    <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
                  )}
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Mínimo 6 caracteres"
                    value={password}
                    onChange={handlePasswordChange}
                    className={`pl-10 pr-10 h-11 sm:h-12 text-sm sm:text-base ${
                      password && (validations.passwordValid ? 'border-green-500' : 'border-red-500')
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {password && (
                  <div className="text-xs text-muted-foreground">
                    {validations.passwordValid ? (
                      <span className="text-green-500">✓ Senha válida</span>
                    ) : (
                      <span className="text-red-500">✗ Mínimo 6 caracteres</span>
                    )}
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirmar Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Digite a senha novamente"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    className={`pl-10 pr-10 h-11 sm:h-12 text-sm sm:text-base ${
                      confirmPassword && (validations.passwordsMatch ? 'border-green-500' : 'border-red-500')
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {confirmPassword && (
                  <div className="text-xs text-muted-foreground">
                    {validations.passwordsMatch ? (
                      <span className="text-green-500">✓ Senhas coincidem</span>
                    ) : (
                      <span className="text-red-500">✗ Senhas não coincidem</span>
                    )}
                  </div>
                )}
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4 px-4 sm:px-6 pb-6">
              <Button 
                type="submit" 
                className={`w-full h-11 sm:h-12 text-sm sm:text-base font-medium transition-all ${
                  isFormValid ? 'bg-primary hover:bg-primary/90' : 'bg-muted text-muted-foreground'
                }`}
                disabled={isLoading || !isFormValid}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Criando conta...
                  </div>
                ) : (
                  'Criar conta'
                )}
              </Button>
              
              <p className="text-center text-xs sm:text-sm text-muted-foreground">
                Já tem uma conta?{' '}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Fazer login
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
        
        <div className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-muted-foreground">
          <p>Suas credenciais serão salvas localmente com segurança</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
