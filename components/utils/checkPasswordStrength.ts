interface PasswordStrength {
  score: number;
  level: 'Muito Fraca' | 'Fraca' | 'Média' | 'Forte' | 'Muito Forte';
  color: string;
  feedback: string[];
}

export default function checkPasswordSecurity(password: string): PasswordStrength {
  let score = 0;
  const feedback: string[] = [];

  if (password.length >= 12) {
    score += 25;
  } else if (password.length >= 8) {
    score += 15;
  } else if (password.length >= 6) {
    score += 10;
  } else {
    feedback.push('Use pelo menos 8 caracteres');
  }

  if (/[A-Z]/.test(password)) {
    score += 15;
  } else {
    feedback.push('Adicione letras maiúsculas');
  }

  if (/[a-z]/.test(password)) {
    score += 15;
  } else {
    feedback.push('Adicione letras minúsculas');
  }

  if (/[0-9]/.test(password)) {
    score += 15;
  } else {
    feedback.push('Adicione números');
  }

  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    score += 15;
  } else {
    feedback.push('Adicione símbolos especiais');
  }

  const uniqueChars = new Set(password).size;
  if (uniqueChars >= password.length * 0.7) {
    score += 10;
  } else if (uniqueChars >= password.length * 0.5) {
    score += 5;
  } else {
    feedback.push('Evite repetir muitos caracteres');
  }

  const hasSequence = /012|123|234|345|456|567|678|789|890|abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz/i.test(password);
  const hasRepeated = /(.)\1{2,}/.test(password);

  if (!hasSequence && !hasRepeated) {
    score += 5;
  } else {
    feedback.push('Evite sequências ou repetições');
  }

  let level: PasswordStrength['level'];
  let color: string;

  if (score >= 80) {
    level = 'Muito Forte';
    color = '#10b981';
  } else if (score >= 60) {
    level = 'Forte';
    color = '#84cc16';
  } else if (score >= 40) {
    level = 'Média';
    color = '#f59e0b';
  } else if (score >= 20) {
    level = 'Fraca';
    color = '#f97316';
  } else {
    level = 'Muito Fraca';
    color = '#ef4444';
  }

  return { score, level, color, feedback };
}