import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { CATEGORIES, CategoryMeta, CategorySlug } from '@/data/trackerData';
import { CategoryTrackerClient } from '@/components/CategoryTrackerClient';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    category: cat.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = CATEGORIES.find((c) => c.slug === params.category);

  if (!category) {
    return {
      title: 'Category Not Found // LEONIDA 100% Tracker',
    };
  }

  return {
    title: `${category.title} Checklist - GTA 6 100% Completion Companion`,
    description: `Complete all ${category.title} in GTA 6 (Leonida & Vice City). ${category.description} Real-time spoiler-shield tracking for PS5 and Xbox Series X|S.`,
    keywords: [
      `GTA 6 ${category.title}`,
      `GTA 6 ${category.shortTitle} guide`,
      `GTA 6 Vice City 100% ${category.shortTitle}`,
      `GTA 6 gold medals`,
      `Leonida secrets checklist`,
    ],
    openGraph: {
      title: `${category.title} Checklist - GTA 6 100% Tracker`,
      description: category.description,
      images: ['/icon.svg'],
    },
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = CATEGORIES.find((c) => c.slug === params.category);

  if (!category) {
    notFound();
  }

  return <CategoryTrackerClient category={category} />;
}
