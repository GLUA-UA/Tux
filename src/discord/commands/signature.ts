import { AttachmentBuilder, type ChatInputCommandInteraction } from 'discord.js';
import { Command } from "../registry/Command";
import Canvas, { GlobalFonts } from '@napi-rs/canvas';
import fs from 'node:fs';
import path from 'node:path';

export default class SignatureCommand extends Command {
    constructor() {
        super("signature", "Creates a personalized signature");
    }
    
    public async execute(interaction: ChatInputCommandInteraction) {
        // Inputs from the user
        const nameInput = interaction.options.getString('name', true);
        const positionInput = interaction.options.getString('position', true);

        // Create a Canvas with the same dimensions as the SVG
        const canvas = Canvas.createCanvas(1500, 450); 
        const context = canvas.getContext('2d');

        // Calculate the best font size to fit in the SVG
        const nameSize = this.fontSize(context, nameInput, 55, 450);
        const positionSize = this.fontSize(context, positionInput, 30, 450);

        // Read the SVG template
        const svgPath = path.join(process.cwd(), 'assets', 'signature.svg');
        let svgCode = fs.readFileSync(svgPath, 'utf-8');

        // Replace the name placeholders with the user's input
        svgCode = svgCode.replace('{{NAME}}', nameInput);
        // Replace the font size placeholders with the calculated sizes
        svgCode = svgCode.replace('{{NAME_SIZE}}', nameSize.toString());

        svgCode = svgCode.replace('{{POSITION}}', positionInput);
        svgCode = svgCode.replace('{{POSITION_SIZE}}', positionSize.toString());

        // Load the modified SVG into a buffer
        const svgBuffer = Buffer.from(svgCode);

        // Draw the SVG into the Canvas
        const bannerImage = await Canvas.loadImage(svgBuffer);
        context.drawImage(bannerImage, 0, 0, canvas.width, canvas.height);

        // Load aetua logo
        const aetuaLogoPath = path.join(process.cwd(), 'assets', 'aetua.svg');
        const aetuaLogo = await Canvas.loadImage(aetuaLogoPath);
        
        // Draw aetua logo into the Canvas
        context.drawImage(aetuaLogo, 1286, 356, 160, 65);

        // Convert to PNG and send the response in Discord with the custom filename
        const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: `assinatura-${nameInput}.png` });
        await interaction.reply({ files: [attachment] });
    }

    // Function to calculate the best font size to fit the text in SVG
    private fontSize(context: any, text: string, maxSize: number, maxWidth: number): number {
        let newSize = maxSize;
        context.font = `bold ${newSize}px "Open Sans"`;

        while (context.measureText(text).width > maxWidth && newSize > 10) {
            newSize -= 2;
            context.font = `bold ${newSize}px "Open Sans"`;
        }

        return newSize;
    }
}