const Lexer = require('./src/Lexer.js');

var lexer = new Lexer();

// options
lexer.setIgnoreCase(true);  // does not make sense for this scanner, just for reference

// definitions
lexer.addDefinition('DIGIT', /[0-9]/);
lexer.addDefinition('ID', /[a-zA-Z0-9]*/);
lexer.addDefinition('PALAVRA', /[a-z0-9]*/);

// rules
lexer.addRule(/\/\*(.*[ \t\n]*)\*\//);

lexer.addRule(/\/\/(.*[ \t]*)*[\n]/);

lexer.addRule(/{DIGIT}+|{DIGIT}"."{DIGIT}*/, function (lexer) {
    console.log('[num: ' + lexer.text + ']');
});

lexer.addRule(/do|while|if|else|switch|for|return|null|int|float|double|string|String|bool|break|case|void|printf|print|#include|scanf/, lexer => {
    console.log(`[reserved_word, ${lexer.text}]`);
});

lexer.addRule(/<(.*)>/, lexer => {
    console.log(`[lib, ${lexer.text}]`);
});

lexer.addRule(/"([^"]*)"/, lexer => {
    console.log(`[string_literal, ${lexer.text}]`);
});

lexer.addRule(/'([^']*)'/, lexer => {
    console.log(`[string_literal, ${lexer.text}]`);
});

lexer.addRule(/{ID}/, lexer => {
    console.log(`[id: ${lexer.text}]`);
});

lexer.addRule(/<|<=|==|!=|>=|>/, lexer => {
    console.log(`[relational_op, ${lexer.text}]`);
});

lexer.addRule(/\+|-|\*|\//, lexer => {
    console.log(`[arith_op, ${lexer.text}]`);
});

lexer.addRule(/&&|\|\|/, lexer => {
    console.log(`[logic_op, ${lexer.text}]`);
});

lexer.addRule(/=/, lexer => {
    console.log(`[equal, ${lexer.text}]`);
});

lexer.addRule(/\(/, lexer => {
    console.log(`[l_paren, ${lexer.text}]`);
});

lexer.addRule(/\)/, lexer => {
    console.log(`[r_paren, ${lexer.text}]`);
});

lexer.addRule(/{/, lexer => {
    console.log(`[l_bracket, ${lexer.text}]`);
});

lexer.addRule(/}/, lexer => {
    console.log(`[r_bracket, ${lexer.text}]`);
});

lexer.addRule(/,/, lexer => {
    console.log(`[comma, ${lexer.text}]`);
});

lexer.addRule(/;/, lexer => {
    console.log(`[semicolon, ${lexer.text}]`);
});

lexer.addRule(/{[\^{}}\n]*}/);

lexer.addRule(/[ \t\n]+/);

lexer.addRule(/./, lexer => {
    console.log("CARACTERE N�O RECONHECIDO");
});

// code
lexer.setSource(`
    #include <stdio.h> 
    #include <conio.h> 
    
    void CalculoMedia() 
    { 
        float NotaDaP1, NotaDaP2; 
        float Media; 
        
        clrscr(); // Limpa a tela  
        NotaDaP1 = 6.6;  // AtribuiÃ§Ã£o do Valores das mÃ©dias 
        NotaDaP2 = 8.2; 
        
        Media = (NotaDaP1 + NotaDaP2) / 2.0; 
        
        printf("MÃ©dia Final : %6.3f", Media); 
        /* No momento da execuÃ§Ã£o sinal %6.3f vai ser substituÃ­do 
        pelo valor da variÃ¡vel Media 
        MÃ©dia Final:  7.400 */ 
        getch(); // Espera que o usuÃ¡rio pressione uma tecla 
    } 
    
    int VerificaNumero() 
    { 
        int num; 
        string s; 
        
        printf ("Digite um nÃºmero: "); 
        scanf ("%d",&num); 
        
        if (num>10) 
        { 
            printf ("\n\n O nÃºmero Ã© maior que 10"); 
            s = "errou"; 
        } 
        if (num==10) 
        { 
            printf ("\n\n VocÃª acertou!\n"); 
            printf ("O numero Ã© igual a 10."); 
            s = "acertou"; 
        } 
        if (num<10) 
        { 
            printf ("\n\n O nÃºmero Ã© menor que 10"); 
            s = "errou"; 
        }     
        if(num == 10 && s == "acertou") 
        { 
            return 1; 
        } 
        return 0; 
    } 
    void AlterarVetor(int * vetor, int elementos) 
    { 
        int i; 
            
        if(vetor != NULL) 
        { 
            for(i = 0; i < elementos; i++) 
            { 
                *(vetor) = *(vetor) * 2; //Ex: V[i] = V[i] * 2 
                vetor++; //Desloca o ponteiro para o prÃ³ximo elemento 
            } 
        } 
    } 
    
    int main() 
    { 
        int v[] = {5, 10, 15, 3, 10, 76, 5, 13, 33, 45}; 
        int * pt; 
        int i; 
        
        pt = v; //Atribui o endereÃ§o do vetor 
        
        AlterarVetor(v, 10); 
        
        for(int i = 0; i < 10; i++) 
        { 
            printf("V[%i] = %i\r\n", i, *(pt + i)); 
        } 
        
        CalculoMedia(); 
        VerificaNumero(); 
        
        return 0; 
    }
`);

lexer.lex();