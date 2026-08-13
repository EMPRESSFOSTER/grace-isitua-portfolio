import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable

def generate_pdf():
    pdf_path = os.path.join(os.getcwd(), 'public', 'Grace-Isitua-CV.pdf')
    os.makedirs(os.path.dirname(pdf_path), exist_ok=True)
    
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter,
        leftMargin=40,
        rightMargin=40,
        topMargin=40,
        bottomMargin=40
    )
    
    styles = getSampleStyleSheet()
    
    name_style = ParagraphStyle(
        'NameStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=22,
        leading=26,
        textColor=colors.HexColor('#111827'),
        spaceAfter=4
    )
    
    title_style = ParagraphStyle(
        'TitleStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=14,
        textColor=colors.HexColor('#374151'),
        spaceAfter=4
    )
    
    contact_style = ParagraphStyle(
        'ContactStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13,
        textColor=colors.HexColor('#4B5563'),
        spaceAfter=12
    )
    
    section_heading = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=16,
        textColor=colors.HexColor('#1F2937'),
        spaceBefore=12,
        spaceAfter=6
    )
    
    sub_heading = ParagraphStyle(
        'SubHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=14,
        textColor=colors.HexColor('#111827'),
        spaceBefore=8,
        spaceAfter=3
    )

    role_heading = ParagraphStyle(
        'RoleHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=14,
        textColor=colors.HexColor('#1F2937'),
        spaceBefore=8,
        spaceAfter=2
    )

    meta_style = ParagraphStyle(
        'MetaStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=9.5,
        leading=12,
        textColor=colors.HexColor('#4B5563'),
        spaceAfter=4
    )
    
    body_style = ParagraphStyle(
        'BodyStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=colors.HexColor('#374151'),
        spaceAfter=4
    )

    bullet_style = ParagraphStyle(
        'BulletStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=colors.HexColor('#374151'),
        leftIndent=12,
        firstLineIndent=-8,
        spaceAfter=3
    )

    story = []

    # Header
    story.append(Paragraph("GRACE ISITUA", name_style))
    story.append(Paragraph("Frontend Developer | Web Designer | Digital Strategist", title_style))
    story.append(Paragraph("Asaba, Delta State, Nigeria &bull; Email: graceantony202@gmail.com &bull; Phone: +234-09015028666", contact_style))
    story.append(Paragraph("Portfolio: <a href='https://graceisitua.netlify.app/'><u>https://graceisitua.netlify.app/</u></a> &bull; LinkedIn: <a href='https://www.linkedin.com/in/isitua-grace/'><u>linkedin.com/in/isitua-grace/</u></a>", contact_style))
    
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#D1D5DB'), spaceBefore=2, spaceAfter=10))

    # Professional Summary
    story.append(Paragraph("PROFESSIONAL SUMMARY", section_heading))
    story.append(Paragraph(
        "Experienced Frontend Engineer with over 6 years of hands-on experience building scalable, responsive, and user-focused web applications across startups, agencies, and digital platforms. Specialized in modern frontend technologies, AI-integrated interfaces, and performance-driven applications using React, Next.js, TypeScript, and modern UI frameworks.",
        body_style
    ))
    story.append(Paragraph(
        "Strong background collaborating with cross-functional teams including backend engineers, AI developers, product managers, and designers to deliver high-quality digital products. Passionate about creating intuitive interfaces for dashboards, analytics platforms, AI-powered systems, and modern SaaS products.",
        body_style
    ))
    story.append(Paragraph(
        "Proven ability to build clean, reusable, and scalable frontend architectures while maintaining accessibility standards, cross-browser compatibility, and excellent user experiences.",
        body_style
    ))

    story.append(Spacer(1, 8))

    # Core Skills
    story.append(Paragraph("CORE SKILLS", section_heading))
    story.append(Paragraph("Frontend Development", sub_heading))
    story.append(Paragraph("&bull; React.js, Next.js, TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS", bullet_style))
    story.append(Paragraph("&bull; Redux Toolkit, Zustand, Framer Motion, Responsive Web Design, Progressive Web Apps (PWA)", bullet_style))

    story.append(Paragraph("AI & Modern Web Technologies", sub_heading))
    story.append(Paragraph("&bull; AI Platform Interfaces, AI Dashboard Development, OpenAI API Integration, REST APIs, GraphQL", bullet_style))
    story.append(Paragraph("&bull; Real-Time Data Interfaces, Analytics Dashboard UI, WebSocket Integration, AI Workflow Interfaces", bullet_style))

    story.append(Paragraph("Tools & Workflow", sub_heading))
    story.append(Paragraph("&bull; Git & GitHub, Figma, VS Code, Firebase, Supabase, Vercel, Netlify, Docker (Basic), Postman, CI/CD Workflows", bullet_style))

    story.append(Paragraph("Performance & Quality", sub_heading))
    story.append(Paragraph("&bull; Cross-Browser Optimization, Accessibility (WCAG), Frontend Architecture, Performance Optimization", bullet_style))
    story.append(Paragraph("&bull; Component Reusability, Code Review, Testing & Debugging, SEO Optimization", bullet_style))

    story.append(Spacer(1, 8))
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#E5E7EB'), spaceBefore=4, spaceAfter=8))

    # Professional Experience
    story.append(Paragraph("PROFESSIONAL EXPERIENCE", section_heading))
    
    story.append(Paragraph("Senior Frontend Engineer / AI Frontend Developer", role_heading))
    story.append(Paragraph("Freelance & Remote Contract Roles &bull; 2021 &ndash; Present", meta_style))
    story.append(Paragraph("&bull; Designed and developed scalable frontend architectures for SaaS platforms, AI-powered systems, agency products, and business applications.", bullet_style))
    story.append(Paragraph("&bull; Built modern user interfaces for dashboards, analytics platforms, AI workflows, and data-driven web applications.", bullet_style))
    story.append(Paragraph("&bull; Developed highly responsive frontend applications using React.js, Next.js, TypeScript, Tailwind CSS, and modern component-based architecture.", bullet_style))
    story.append(Paragraph("&bull; Integrated RESTful APIs, authentication systems, third-party services, payment gateways, and cloud-based solutions.", bullet_style))
    story.append(Paragraph("&bull; Implemented reusable UI systems and component libraries to improve scalability and development efficiency.", bullet_style))
    story.append(Paragraph("&bull; Optimized frontend performance using lazy loading, image optimization, code splitting, and caching strategies.", bullet_style))
    story.append(Paragraph("&bull; Mentored junior developers and collaborated on frontend best practices and clean code standards.", bullet_style))

    story.append(Paragraph("Frontend Developer & Web Designer", role_heading))
    story.append(Paragraph("BRAND SPARK &bull; 2022 &ndash; Present", meta_style))
    story.append(Paragraph("&bull; Led frontend development and UI/UX implementation for multiple business and startup projects.", bullet_style))
    story.append(Paragraph("&bull; Designed conversion-focused landing pages, corporate websites, and digital business platforms.", bullet_style))
    story.append(Paragraph("&bull; Developed reusable frontend sections and responsive layouts optimized for user engagement.", bullet_style))
    story.append(Paragraph("&bull; Collaborated with marketing teams to improve user experience and digital campaign performance.", bullet_style))
    story.append(Paragraph("&bull; Improved website SEO structure, responsiveness, and performance optimization.", bullet_style))

    story.append(Paragraph("Frontend Developer & Digital Product Designer", role_heading))
    story.append(Paragraph("DIGITAL ABODE &bull; 2023 &ndash; Present", meta_style))
    story.append(Paragraph("&bull; Contributed to the development of AI-focused digital experiences and co-working platform interfaces.", bullet_style))
    story.append(Paragraph("&bull; Built modern web interfaces for digital services, community platforms, and creative technology initiatives.", bullet_style))
    story.append(Paragraph("&bull; Worked on integrating modern AI workflows and interactive digital experiences into web products.", bullet_style))

    story.append(Paragraph("Technical Support & IT Assistant", role_heading))
    story.append(Paragraph("Ruthenbud Travels and Tours &bull; 2022 &ndash; 2023", meta_style))
    story.append(Paragraph("&bull; Managed technical support operations and assisted with digital systems maintenance.", bullet_style))
    story.append(Paragraph("&bull; Supported website management, content updates, and troubleshooting of technical issues.", bullet_style))

    story.append(Paragraph("Junior Web Designer & Frontend Developer", role_heading))
    story.append(Paragraph("Freelance Projects & Agency Collaborations &bull; 2019 &ndash; 2021", meta_style))
    story.append(Paragraph("&bull; Developed responsive business websites and landing pages for small businesses and startups.", bullet_style))
    story.append(Paragraph("&bull; Converted design mockups into functional frontend interfaces using HTML, CSS, JavaScript, and Bootstrap.", bullet_style))

    story.append(Spacer(1, 8))
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#E5E7EB'), spaceBefore=4, spaceAfter=8))

    # Projects & Client Work
    story.append(Paragraph("PROJECTS & CLIENT WORK", section_heading))
    
    story.append(Paragraph("Hotel Arex", sub_heading))
    story.append(Paragraph("Website: <a href='https://hotelarex.com/'><u>https://hotelarex.com/</u></a>", meta_style))
    story.append(Paragraph("&bull; Designed and developed a modern hotel booking and hospitality website with intuitive UI/UX design.", bullet_style))

    story.append(Paragraph("Shoppadi", sub_heading))
    story.append(Paragraph("Website: <a href='https://shoppadi.com/'><u>https://shoppadi.com/</u></a>", meta_style))
    story.append(Paragraph("&bull; Developed scalable frontend pages for an eCommerce platform with an optimized shopping experience.", bullet_style))

    story.append(Paragraph("EllaBell Hotel and Suites", sub_heading))
    story.append(Paragraph("Website: <a href='https://ellabellhotelandsuites.com/'><u>https://ellabellhotelandsuites.com/</u></a>", meta_style))
    story.append(Paragraph("&bull; Built a modern hospitality website focused on performance, booking interfaces, and visual appeal.", bullet_style))

    story.append(Paragraph("Genis Graphics", sub_heading))
    story.append(Paragraph("Branding & Web Development Agency Project", meta_style))
    story.append(Paragraph("&bull; Developed agency web interfaces, branding-focused digital experiences, and reusable frontend components.", bullet_style))

    story.append(Spacer(1, 8))

    # Education & Certifications
    story.append(Paragraph("EDUCATION & CERTIFICATIONS", section_heading))
    story.append(Paragraph("&bull; <b>Ogbonnaya Onu Polytechnic (Abia Polytechnic)</b> &bull; 2019 &ndash; 2022", bullet_style))
    story.append(Paragraph("&bull; <b>Industrial Training (IT)</b> &bull; Ruthenbud Travels and Tours &bull; 2022 &ndash; 2023", bullet_style))
    story.append(Paragraph("&bull; <b>Maylab Frontend Engineer Verification</b> &bull; 2026", bullet_style))
    story.append(Paragraph("&bull; <b>Frontend Engineering Certification</b>", bullet_style))

    doc.build(story)
    print("Successfully generated public/Grace-Isitua-CV.pdf")

if __name__ == '__main__':
    generate_pdf()
