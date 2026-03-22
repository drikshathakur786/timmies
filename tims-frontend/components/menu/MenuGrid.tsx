'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SlidersHorizontal } from 'lucide-react'
import { menuItems, categories, MenuCategory } from '@/lib/data/menu'
import MenuCard from '@/components/menu/MenuCard'
import CategorySidebar from '@/components/menu/CategorySidebar'
import SearchBar from '@/components/menu/SearchBar'
import { staggerContainer } from '@/lib/utils/animations'

export default function MenuGrid() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory | 'all'>('all')
  const [query,          setQuery]          = useState('')
  const [activeFilters,  setActiveFilters]  = useState<string[]>([])
  const [showMobileCat,  setShowMobileCat]  = useState(false)

  const handleCategoryChange = (cat: MenuCategory | 'all') => {
    setActiveCategory(cat)
  }

  const toggleFilter = (id: string) => {
    setActiveFilters(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    )
  }

  const filtered = useMemo(() => {
    return menuItems.filter(item => {
      if (activeCategory !== 'all' && item.category !== activeCategory) return false
      if (query.trim()) {
        const q = query.toLowerCase()
        const matches =
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.tags.some(t => t.toLowerCase().includes(q)) ||
          item.categoryLabel.toLowerCase().includes(q)
        if (!matches) return false
      }
      if (activeFilters.includes('popular')      && !item.popular)                    return false
      if (activeFilters.includes('under-5')      && item.price >= 5)                  return false
      if (activeFilters.includes('under-300')    && item.calories >= 300)             return false
      if (activeFilters.includes('hot')          && item.category !== 'hot-drinks')   return false
      if (activeFilters.includes('cold')         && item.category !== 'cold-drinks')  return false
      if (activeFilters.includes('customizable') && !item.customizable)               return false
      return true
    })
  }, [activeCategory, query, activeFilters])

  const counts = useMemo(() => {
    const result: Record<string, number> = {}
    categories.forEach(cat => {
      result[cat.id] = menuItems.filter(i => i.category === cat.id).length
    })
    return result
  }, [])

  const resetAll = () => {
    setQuery('')
    setActiveFilters([])
    setActiveCategory('all')
  }

  return (
    <div style={{ position: 'relative' }}>

      {/* Mobile category toggle */}
      <div style={{ marginBottom: '1rem' }} className="mobile-cat-toggle">
        <motion.button
          onClick={() => setShowMobileCat(!showMobileCat)}
          whileTap={{ scale: 0.97 }}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: 'rgba(255,245,228,0.05)',
            border: '1px solid rgba(255,245,228,0.1)',
            borderRadius: '12px', padding: '10px 16px',
            fontFamily: 'var(--font-body)', fontSize: '0.875rem',
            color: '#FFF5E4', cursor: 'none',
            width: '100%', justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <SlidersHorizontal size={15} strokeWidth={1.5} color="#C8102E" />
            Categories
          </div>
          <span style={{
            fontFamily: 'var(--font-body)', fontSize: '0.72rem',
            color: '#C8102E', background: 'rgba(200,16,46,0.1)',
            borderRadius: '100px', padding: '2px 8px',
          }}>
            {activeCategory === 'all' ? 'All' : categories.find(c => c.id === activeCategory)?.label}
          </span>
        </motion.button>

        <AnimatePresence>
          {showMobileCat && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', padding: '12px 0' }}>
                {[{ id: 'all' as const, label: 'All' }, ...categories.map(c => ({ id: c.id, label: c.label }))].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => { handleCategoryChange(cat.id); setShowMobileCat(false) }}
                    style={{
                      fontFamily: 'var(--font-body)', fontSize: '0.8rem',
                      color: activeCategory === cat.id ? '#FFF5E4' : '#C9B99A',
                      background: activeCategory === cat.id ? '#C8102E' : 'rgba(255,245,228,0.05)',
                      border: '1px solid ' + (activeCategory === cat.id ? 'rgba(200,16,46,0.5)' : 'rgba(255,245,228,0.1)'),
                      borderRadius: '100px', padding: '6px 16px', cursor: 'none',
                    }}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main layout */}
      <div style={{ display: 'flex', gap: '3rem', alignItems: 'flex-start' }}>

        {/* Sidebar — desktop only */}
        <div className="sidebar-desktop">
          <CategorySidebar
            active={activeCategory}
            onChange={handleCategoryChange}
            counts={counts}
          />
        </div>

        {/* Right: search + grid */}
        <div style={{ flex: 1, minWidth: 0 }}>

          <div style={{ marginBottom: '2rem' }}>
            <SearchBar
              query={query}
              onQueryChange={setQuery}
              activeFilters={activeFilters}
              onFilterToggle={toggleFilter}
            />
          </div>

          {/* Results count */}
          <div style={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', marginBottom: '1.5rem',
          }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#C9B99A', margin: 0 }}>
              Showing{' '}
              <span style={{ color: '#FFF5E4', fontWeight: 500 }}>{filtered.length}</span>
              {' '}item{filtered.length !== 1 ? 's' : ''}
              {activeCategory !== 'all' && (
                <span> in <span style={{ color: '#C8102E' }}>{categories.find(c => c.id === activeCategory)?.label}</span></span>
              )}
              {query && (
                <span> for &quot;<span style={{ color: '#D4A017' }}>{query}</span>&quot;</span>
              )}
            </p>
            {(query || activeFilters.length > 0 || activeCategory !== 'all') && (
              <motion.button
                onClick={resetAll}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  fontFamily: 'var(--font-body)', fontSize: '0.75rem',
                  color: '#C8102E', background: 'rgba(200,16,46,0.08)',
                  border: '1px solid rgba(200,16,46,0.2)',
                  borderRadius: '100px', padding: '4px 12px', cursor: 'none',
                }}
              >
                Reset all
              </motion.button>
            )}
          </div>

          {/* Grid or empty state */}
          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div
                key="grid"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                  gap: '1.25rem',
                }}
              >
                {filtered.map(item => (
                  <MenuCard key={item.id} item={item} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                style={{
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  padding: '5rem 2rem', textAlign: 'center',
                }}
              >
                <div style={{
                  width: '64px', height: '64px', borderRadius: '20px',
                  background: 'rgba(255,245,228,0.05)',
                  border: '1px solid rgba(255,245,228,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '1.5rem',
                }}>
                  <SlidersHorizontal size={24} strokeWidth={1} color="#C9B99A" />
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-display)', fontSize: '1.5rem',
                  fontWeight: 300, color: '#FFF5E4', margin: '0 0 8px 0',
                }}>
                  No items found
                </h3>
                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: '0.875rem',
                  color: '#C9B99A', margin: '0 0 1.5rem 0', maxWidth: '300px',
                }}>
                  Try adjusting your search or filters to find what you are looking for.
                </p>
                <button
                  onClick={resetAll}
                  style={{
                    fontFamily: 'var(--font-body)', fontSize: '0.875rem',
                    color: '#FFF5E4', background: '#C8102E',
                    border: 'none', borderRadius: '100px',
                    padding: '10px 28px', cursor: 'none',
                    boxShadow: '0 0 20px rgba(200,16,46,0.4)',
                  }}
                >
                  Clear filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        .mobile-cat-toggle { display: none; }
        .sidebar-desktop   { display: block; }
        @media (max-width: 768px) {
          .mobile-cat-toggle { display: block; }
          .sidebar-desktop   { display: none;  }
        }
      `}</style>
    </div>
  )
}
