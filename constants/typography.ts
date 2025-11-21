/**
 * Configuração de tipografia do app de astrologia Lunnarys
 * 
 * Fontes:
 * - Outfit: Para headings (títulos)
 * - Inter: Para body (texto corrido)
 * - Playfair Display: Para títulos especiais/místicos
 */

export const Typography = {
	fonts: {
		heading: 'Outfit-Bold', // Usar variante bold por padrão para headings
		headingRegular: 'Outfit-Regular',
		headingMedium: 'Outfit-Medium',
		headingSemiBold: 'Outfit-SemiBold',
		headingBold: 'Outfit-Bold',
		body: 'Inter-Regular',
		bodyRegular: 'Inter-Regular',
		bodyMedium: 'Inter-Medium',
		bodySemiBold: 'Inter-SemiBold',
		bodyBold: 'Inter-Bold',
		mystical: 'PlayfairDisplay-Bold', // Usar variante bold por padrão para títulos místicos
		mysticalRegular: 'PlayfairDisplay-Regular',
		mysticalMedium: 'PlayfairDisplay-Medium',
		mysticalSemiBold: 'PlayfairDisplay-SemiBold',
		mysticalBold: 'PlayfairDisplay-Bold',
	},
	sizes: {
		// Headings (Outfit)
		h1: 34, // 32-36px (média: 34px)
		h2: 26, // 24-28px (média: 26px)
		h3: 19, // 18-20px (média: 19px)
		
		// Body (Inter)
		body1: 16,
		body2: 14,
		small: 12,
	},
	lineHeights: {
		h1: 40,
		h2: 32,
		h3: 24,
		body1: 24,
		body2: 20,
		small: 16,
	},
	weights: {
		regular: '400' as const,
		medium: '500' as const,
		semiBold: '600' as const,
		bold: '700' as const,
	},
}

export const TextStyles = {
	h1: {
		fontFamily: Typography.fonts.headingBold,
		fontSize: Typography.sizes.h1,
		lineHeight: Typography.lineHeights.h1,
	},
	h2: {
		fontFamily: Typography.fonts.headingBold,
		fontSize: Typography.sizes.h2,
		lineHeight: Typography.lineHeights.h2,
	},
	h3: {
		fontFamily: Typography.fonts.headingSemiBold,
		fontSize: Typography.sizes.h3,
		lineHeight: Typography.lineHeights.h3,
	},
	body1: {
		fontFamily: Typography.fonts.bodyRegular,
		fontSize: Typography.sizes.body1,
		lineHeight: Typography.lineHeights.body1,
	},
	body2: {
		fontFamily: Typography.fonts.bodyRegular,
		fontSize: Typography.sizes.body2,
		lineHeight: Typography.lineHeights.body2,
	},
	small: {
		fontFamily: Typography.fonts.bodyRegular,
		fontSize: Typography.sizes.small,
		lineHeight: Typography.lineHeights.small,
	},
	mystical: {
		fontFamily: Typography.fonts.mysticalBold,
		fontSize: Typography.sizes.h1,
		lineHeight: Typography.lineHeights.h1,
	},
}

