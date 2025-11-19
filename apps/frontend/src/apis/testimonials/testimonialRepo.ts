import type { TestimonialCardProps } from "../../types/testimonialCardProps";
import { testimonialData } from "./testimonialData";

export function fetchTestimonials(): TestimonialCardProps[] {
    return testimonialData;
}

export function getTestimonialById(id: string): TestimonialCardProps {
    const found = testimonialData.find(t => t.id === id);
    if (!found)
        throw new Error(`Testimonial with ID ${id} not found`);
    return found;
}

export async function addTestimonial(newTestimonial: TestimonialCardProps) {
    testimonialData.push(newTestimonial);
    return newTestimonial;
}

export async function updateTestimonial(updated: TestimonialCardProps) {
    const index = testimonialData.findIndex(t => t.id === updated.id);
    if (index === -1)
        throw new Error(`Testimonial with ID ${updated.id} not found`);
    testimonialData[index] = updated;
    return updated;
}