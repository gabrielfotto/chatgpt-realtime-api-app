# Padrão de Traduções

Este documento define o padrão de nomenclatura e estruturação das traduções no projeto.

## Estrutura Básica

As chaves de tradução seguem o padrão:

```
<contexto>.<tipo>.<identificador>
```

## Prefixos por Tipo

### Componentes (c. ou component.)

Para textos que estão dentro de componentes reutilizáveis.

```json
{
	"c.stepForm.intro.title": "...",
	"c.stepForm.button.start": "..."
}
```

### Telas/Páginas (s. ou screen.)

Para textos específicos de uma tela/página.

```json
{
	"s.form.title": "...",
	"s.voice.header": "..."
}
```

### Mensagens de Feedback (f. ou feedback.)

Para mensagens de erro, sucesso, alertas, etc.

```json
{
	"f.error.required": "...",
	"f.success.saved": "..."
}
```

### Validações (v. ou validation.)

Para mensagens de validação de campos.

```json
{
	"v.field.required": "...",
	"v.email.invalid": "..."
}
```

### Labels/Textos Comuns (l. ou label.)

Para labels e textos reutilizáveis em toda a aplicação.

```json
{
	"l.button.back": "...",
	"l.button.next": "..."
}
```

### Placeholders (p. ou placeholder.)

Para textos de placeholder em inputs.

```json
{
	"p.input.search": "..."
}
```

## Padrões Específicos

### Arrays de Texto

```json
{
	"c.formIntro.paragraphs.welcome": "...",
	"c.formIntro.paragraphs.description": "...",
	"c.formIntro.paragraphs.callToAction": "..."
}
```

### Opções/Enums

```json
{
	"c.stepForm.options.abandonment": "...",
	"c.stepForm.options.sexualAbuse": "..."
}
```

### Textos Dinâmicos

```json
{
	"c.welcome.greeting": "Olá, {{name}}",
	"f.items.count": "{{count}} item(s) selecionado(s)"
}
```

## Regras Gerais

1. **Nomenclatura**

   - Usar camelCase para as chaves
   - Evitar chaves muito longas (máximo 3-4 níveis)
   - Usar nomes descritivos e semânticos

2. **Organização**

   - Manter consistência no uso dos prefixos
   - Agrupar traduções relacionadas
   - Evitar duplicação de textos

3. **Boas Práticas**
   - Sempre usar os prefixos definidos
   - Documentar casos especiais
   - Manter as traduções organizadas por contexto

## Exemplo de Uso

```typescript
// Em um componente
const { t } = useTranslation()

return (
	<View>
		<Text>{t('c.stepForm.intro.title')}</Text>
		<Text>{t('c.stepForm.intro.paragraphs.welcome')}</Text>
		<Button>{t('l.button.next')}</Button>
		{error && <Text>{t('f.error.required')}</Text>}
	</View>
)
```

## Estrutura de Arquivos

```
/i18n
  /common          # traduções globais
    pt.json
    en.json
  /types        # tipos TypeScript
    index.ts
  index.ts      # configuração do i18n
```

## Exemplo de Estrutura Completa

```json
{
	"c": {
		"stepForm": {
			"intro": {
				"title": "Título",
				"paragraphs": {
					"welcome": "Bem-vindo",
					"description": "Descrição",
					"callToAction": "Vamos começar?"
				},
				"button": {
					"start": "Começar jornada"
				}
			}
		}
	},
	"s": {
		"form": {
			"title": "Formulário",
			"subtitle": "Preencha os campos abaixo"
		}
	},
	"l": {
		"button": {
			"back": "Voltar",
			"next": "Continuar",
			"finish": "Concluir"
		}
	}
}
```
