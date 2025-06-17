/**
 * Glocal Strategy Checklist - Questions Database
 * 
 * This file contains all the questions used in the assessment.
 * Each question includes:
 * - id: Unique identifier
 * - text: The question being asked
 * - section: The business function this question relates to
 * - options: Possible answers (array of 5 options from global to local)
 * - tooltip: Additional explanation (optional)
 */

const ASSESSMENT_SECTIONS = [
    {
        id: "marketing",
        title: "Marketing Strategy",
        description: "How you promote and position your brand across different markets"
    },
    {
        id: "product",
        title: "Product Development",
        description: "How you design and modify your products or services for different markets"
    },
    {
        id: "operations",
        title: "Operations & Logistics",
        description: "How you structure your supply chain and business processes"
    },
    {
        id: "customer",
        title: "Customer Experience",
        description: "How you engage with and support customers in different regions"
    },
    {
        id: "organization",
        title: "Organization & Culture",
        description: "How you structure your teams and foster your company culture"
    }
];

const ASSESSMENT_QUESTIONS = [
    // Marketing Strategy Questions
    {
        id: "m1",
        text: "How do you approach brand messaging across different markets?",
        section: "marketing",
        options: [
            { value: 1, text: "Completely standardized - identical messaging worldwide" },
            { value: 2, text: "Mostly standardized - minor language translations only" },
            { value: 3, text: "Balanced - core messages standardized, some local adaptations" },
            { value: 4, text: "Mostly localized - significant regional adaptations to messaging" },
            { value: 5, text: "Completely localized - entirely different messaging by market" }
        ],
        tooltip: "Consider how your key brand messages and positioning are handled across markets."
    },
    {
        id: "m2",
        text: "How do you handle visual branding elements (logos, colors, imagery) globally?",
        section: "marketing",
        options: [
            { value: 1, text: "Completely standardized - identical visual elements worldwide" },
            { value: 2, text: "Mostly standardized - minimal regional variations" },
            { value: 3, text: "Balanced - consistent core elements with some local adaptations" },
            { value: 4, text: "Mostly localized - significant visual adaptations by region" },
            { value: 5, text: "Completely localized - different visual identities by market" }
        ]
    },
    {
        id: "m3",
        text: "How do you approach marketing campaigns and promotions?",
        section: "marketing",
        options: [
            { value: 1, text: "Global campaigns only - identical worldwide" },
            { value: 2, text: "Primarily global campaigns with minimal local adaptations" },
            { value: 3, text: "Global campaign frameworks with significant local implementation" },
            { value: 4, text: "Primarily local campaigns with some global guidelines" },
            { value: 5, text: "Entirely local campaigns with no global coordination" }
        ]
    },
    {
        id: "m4",
        text: "How do you determine pricing strategies across different markets?",
        section: "marketing",
        options: [
            { value: 1, text: "Uniform global pricing (accounting only for currency conversion)" },
            { value: 2, text: "Mostly standardized pricing with minor regional adjustments" },
            { value: 3, text: "Tiered global pricing strategy with market-based modifications" },
            { value: 4, text: "Primarily market-based pricing with some global guidelines" },
            { value: 5, text: "Completely localized pricing based solely on local conditions" }
        ]
    },
    {
        id: "m5",
        text: "How do you select and use marketing channels across different markets?",
        section: "marketing",
        options: [
            { value: 1, text: "Identical channel mix and strategy globally" },
            { value: 2, text: "Same primary channels with minor local adjustments" },
            { value: 3, text: "Core channel strategy with significant local modifications" },
            { value: 4, text: "Primarily local channel selection with loose global guidelines" },
            { value: 5, text: "Completely independent channel strategies by market" }
        ]
    },
    
    // Product Development Questions
    {
        id: "p1",
        text: "How do you approach product/service design for different markets?",
        section: "product",
        options: [
            { value: 1, text: "Completely standardized global products with no local variations" },
            { value: 2, text: "Core global products with minimal market-specific adaptations" },
            { value: 3, text: "Global product platforms with significant local customization" },
            { value: 4, text: "Primarily local products with some global components" },
            { value: 5, text: "Entirely market-specific products designed locally" }
        ]
    },
    {
        id: "p2",
        text: "How do you incorporate local market feedback into your product development?",
        section: "product",
        options: [
            { value: 1, text: "Product decisions made centrally with minimal local input" },
            { value: 2, text: "Occasional local input but global HQ makes final decisions" },
            { value: 3, text: "Structured global feedback process with balanced influence" },
            { value: 4, text: "Strong local influence on product development decisions" },
            { value: 5, text: "Complete local autonomy in product development" }
        ]
    },
    {
        id: "p3",
        text: "How do you approach feature prioritization across different markets?",
        section: "product",
        options: [
            { value: 1, text: "Global prioritization only - same features released worldwide" },
            { value: 2, text: "Global roadmap with minimal regional variations" },
            { value: 3, text: "Global core features plus significant market-specific additions" },
            { value: 4, text: "Market-led feature prioritization with global oversight" },
            { value: 5, text: "Completely independent feature roadmaps by market" }
        ]
    },
    {
        id: "p4",
        text: "How do you handle product/service naming across markets?",
        section: "product",
        options: [
            { value: 1, text: "Identical product names used globally" },
            { value: 2, text: "Mostly standardized names with minor linguistic adaptations" },
            { value: 3, text: "Core naming framework with significant local adaptations" },
            { value: 4, text: "Market-specific naming with loose global guidelines" },
            { value: 5, text: "Completely independent naming by market" }
        ]
    },
    {
        id: "p5",
        text: "How do you approach product packaging across different markets?",
        section: "product",
        options: [
            { value: 1, text: "Identical packaging globally (aside from required translations)" },
            { value: 2, text: "Standardized packaging with minor regional adjustments" },
            { value: 3, text: "Core packaging template with significant local adaptations" },
            { value: 4, text: "Market-led packaging design with some global elements" },
            { value: 5, text: "Completely market-specific packaging" }
        ]
    },
    
    // Operations & Logistics Questions
    {
        id: "o1",
        text: "How standardized are your business processes across markets?",
        section: "operations",
        options: [
            { value: 1, text: "Completely standardized global processes with no variations" },
            { value: 2, text: "Mostly standardized processes with minimal local adjustments" },
            { value: 3, text: "Core global processes with significant local adaptations" },
            { value: 4, text: "Primarily local processes with some global standards" },
            { value: 5, text: "Completely independent processes by market" }
        ]
    },
    {
        id: "o2",
        text: "How do you approach supply chain management across regions?",
        section: "operations",
        options: [
            { value: 1, text: "Completely centralized global supply chain" },
            { value: 2, text: "Primarily global supply chain with minor regional hubs" },
            { value: 3, text: "Balanced mix of global and regional supply chain components" },
            { value: 4, text: "Primarily regional supply chains with global oversight" },
            { value: 5, text: "Completely independent local supply chains" }
        ]
    },
    {
        id: "o3",
        text: "How do you approach technology systems and infrastructure?",
        section: "operations",
        options: [
            { value: 1, text: "Identical global systems with no local variations" },
            { value: 2, text: "Global core systems with minimal local customizations" },
            { value: 3, text: "Standard global platforms with significant local adaptations" },
            { value: 4, text: "Primarily local systems with some global integration" },
            { value: 5, text: "Completely independent local technology stacks" }
        ]
    },
    {
        id: "o4",
        text: "How do you manage quality standards across different markets?",
        section: "operations",
        options: [
            { value: 1, text: "Identical global quality standards rigorously enforced" },
            { value: 2, text: "Global standards with minor market-specific adjustments" },
            { value: 3, text: "Core global standards with significant local adaptations" },
            { value: 4, text: "Primarily local quality standards with global minimums" },
            { value: 5, text: "Completely market-specific quality approaches" }
        ]
    },
    {
        id: "o5",
        text: "How do you approach compliance and regulatory adaptation?",
        section: "operations",
        options: [
            { value: 1, text: "Apply strictest global standards everywhere regardless of local requirements" },
            { value: 2, text: "Global compliance framework with minimal local adaptations" },
            { value: 3, text: "Core global standards plus significant local regulatory adaptations" },
            { value: 4, text: "Primarily local compliance approaches with global oversight" },
            { value: 5, text: "Completely independent local compliance handling" }
        ]
    },
    
    // Customer Experience Questions
    {
        id: "c1",
        text: "How do you approach customer service across different markets?",
        section: "customer",
        options: [
            { value: 1, text: "Identical customer service model globally" },
            { value: 2, text: "Global service model with minor local adjustments" },
            { value: 3, text: "Core global service standards with significant local adaptation" },
            { value: 4, text: "Primarily local service models with some global standards" },
            { value: 5, text: "Completely market-specific customer service approaches" }
        ]
    },
    {
        id: "c2",
        text: "How do you handle customer feedback and research?",
        section: "customer",
        options: [
            { value: 1, text: "Centralized global research with minimal local input" },
            { value: 2, text: "Global research methods with some local implementation" },
            { value: 3, text: "Balanced mix of global and local research initiatives" },
            { value: 4, text: "Primarily local research with global coordination" },
            { value: 5, text: "Completely independent local customer research" }
        ]
    },
    {
        id: "c3",
        text: "How do you approach customer loyalty programs?",
        section: "customer",
        options: [
            { value: 1, text: "Identical global loyalty program" },
            { value: 2, text: "Global program with minor local adjustments" },
            { value: 3, text: "Global program framework with significant local customization" },
            { value: 4, text: "Primarily local loyalty programs with global guidelines" },
            { value: 5, text: "Completely independent local loyalty programs" }
        ]
    },
    {
        id: "c4",
        text: "How do you manage the customer digital experience?",
        section: "customer",
        options: [
            { value: 1, text: "Identical global websites/apps with language translation only" },
            { value: 2, text: "Global digital platforms with minimal local adaptations" },
            { value: 3, text: "Global templates with significant local customization" },
            { value: 4, text: "Primarily local digital experiences with some global elements" },
            { value: 5, text: "Completely independent local digital experiences" }
        ]
    },
    {
        id: "c5",
        text: "How do you approach customer communication and content?",
        section: "customer",
        options: [
            { value: 1, text: "Centrally created global content with translation only" },
            { value: 2, text: "Global content templates with minor local adaptations" },
            { value: 3, text: "Global content frameworks with significant local creation" },
            { value: 4, text: "Primarily local content with some global guidelines" },
            { value: 5, text: "Completely local content creation with no global oversight" }
        ]
    },
    
    // Organization & Culture Questions
    {
        id: "g1",
        text: "How centralized is your organizational decision-making?",
        section: "organization",
        options: [
            { value: 1, text: "Completely centralized - all key decisions made at global HQ" },
            { value: 2, text: "Mostly centralized with limited regional authority" },
            { value: 3, text: "Balanced authority between global and local leadership" },
            { value: 4, text: "Mostly decentralized with limited global oversight" },
            { value: 5, text: "Completely decentralized - full local autonomy" }
        ]
    },
    {
        id: "g2",
        text: "How do you approach company culture across different regions?",
        section: "organization",
        options: [
            { value: 1, text: "Single global culture rigorously maintained everywhere" },
            { value: 2, text: "Strong global culture with minimal local variations" },
            { value: 3, text: "Core global values with significant local cultural expressions" },
            { value: 4, text: "Primarily local cultures with some global values" },
            { value: 5, text: "Completely independent local company cultures" }
        ]
    },
    {
        id: "g3",
        text: "How do you structure regional leadership teams?",
        section: "organization",
        options: [
            { value: 1, text: "Leadership primarily from global HQ with minimal local representation" },
            { value: 2, text: "Majority expatriate leadership with some local talent" },
            { value: 3, text: "Balanced mix of global and local leadership" },
            { value: 4, text: "Primarily local leadership with some global representation" },
            { value: 5, text: "Completely local leadership with minimal global interaction" }
        ]
    },
    {
        id: "g4",
        text: "How do you approach talent development and training?",
        section: "organization",
        options: [
            { value: 1, text: "Identical global programs with no local adaptations" },
            { value: 2, text: "Global programs with minor local adjustments" },
            { value: 3, text: "Global frameworks with significant local customization" },
            { value: 4, text: "Primarily local programs with some global guidelines" },
            { value: 5, text: "Completely independent local talent development" }
        ]
    },
    {
        id: "g5",
        text: "How do you share knowledge and best practices across regions?",
        section: "organization",
        options: [
            { value: 1, text: "Top-down knowledge transfer from global HQ to local markets" },
            { value: 2, text: "Primarily global-to-local knowledge flow with some local input" },
            { value: 3, text: "Balanced knowledge exchange between global and local teams" },
            { value: 4, text: "Primarily local knowledge development with some global sharing" },
            { value: 5, text: "Minimal cross-market knowledge sharing" }
        ]
    }
];

// Recommendation templates based on section scores
const RECOMMENDATIONS = {
    global: {
        marketing: "Consider allowing more local adaptation in your marketing approach. Global messaging may not resonate equally in all markets. Try piloting market-specific campaigns in 1-2 regions to test effectiveness.",
        product: "Your highly standardized product approach may be missing opportunities to meet local needs. Consider creating a structured feedback loop from local markets to influence product development.",
        operations: "While standardized operations offer efficiency, they may lack necessary flexibility. Identify areas where local adaptation could solve market-specific challenges without compromising core processes.",
        customer: "Your standardized customer experience may not account for cultural differences in service expectations. Consider implementing local customer research to identify adaptation opportunities.",
        organization: "Your centralized organizational structure may be limiting local market responsiveness. Consider delegating more decision-making authority to regional leaders while maintaining global alignment."
    },
    balanced: {
        marketing: "Your balanced marketing approach effectively combines global consistency with local relevance. Continue monitoring performance metrics to fine-tune the global-local balance for each market.",
        product: "Your product strategy strikes a good balance between standardization and adaptation. Consider formalizing your approach into clear guidelines to maintain this balance as you enter new markets.",
        operations: "Your operations effectively balance global efficiency with local flexibility. Document successful cases where this balanced approach has created value to reinforce best practices.",
        customer: "Your customer experience successfully balances global standards with local expectations. Consider creating cross-regional teams to share innovations that could benefit multiple markets.",
        organization: "Your organizational structure effectively balances global direction with local empowerment. Consider implementing formal knowledge-sharing processes to spread successful approaches across regions."
    },
    local: {
        marketing: "Your highly localized marketing may be missing economies of scale and brand consistency opportunities. Consider identifying core brand elements that could be standardized across markets.",
        product: "Your market-specific product approach may be creating inefficiencies and missed opportunities for global synergies. Consider developing global product platforms that allow for local customization.",
        operations: "Your highly localized operations may be duplicating efforts and missing efficiency opportunities. Identify processes that could be standardized across regions without compromising market responsiveness.",
        customer: "While your localized customer approach addresses market needs, it may be missing opportunities for efficiency and consistent brand experience. Consider creating global minimum standards.",
        organization: "Your decentralized structure provides local autonomy but may create silos and inefficiency. Consider implementing global coordination mechanisms while preserving local decision-making."
    }
};