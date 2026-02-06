# Quick Reference Guide

## 🎯 Component Map

### Where to Find What?

| Feature             | File                  | Type      |
| ------------------- | --------------------- | --------- |
| User auth & profile | `useProfileFetch.ts`  | Hook      |
| Stock search        | `useStockSearch.ts`   | Hook      |
| Tab data fetching   | `useTabData.ts`       | Hook      |
| Left sidebar        | `Sidebar.tsx`         | Component |
| Top bar/header      | `TopBar.tsx`          | Component |
| Company details     | `CompanyInfoCard.tsx` | Component |
| News tab content    | `NewsTab.tsx`         | Component |
| Predictions tab     | `PredictionsTab.tsx`  | Component |
| Investors tab       | `InvestorsTab.tsx`    | Component |
| Guidelines tab      | `GuidelinesTab.tsx`   | Component |
| Main page logic     | `Home.tsx`            | Container |

---

## 🔗 Import Paths

### From Home.tsx:

```typescript
// Hooks
import { useProfileFetch } from "@/hooks/useProfileFetch";
import { useStockSearch } from "@/hooks/useStockSearch";
import { useTabData } from "@/hooks/useTabData";

// Components
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { CompanyInfoCard } from "@/components/CompanyInfoCard";
import { NewsTab } from "@/components/NewsTab";
import { PredictionsTab } from "@/components/PredictionsTab";
import { InvestorsTab } from "@/components/InvestorsTab";
import { GuidelinesTab } from "@/components/GuidelinesTab";
```

---

## 📋 Hook Interfaces

### useProfileFetch()

```typescript
{
  user: {
    email: string;
    name: string;
    mobile: string;
    isVerified: number;
  } | null
  loading: boolean
}
```

### useStockSearch()

```typescript
{
  searchTicker: string
  setSearchTicker: (value: string) => void
  selectedStock: CompanyResponse | null
  setSelectedStock: (stock: CompanyResponse | null) => void
  searchLoading: boolean
  handleSearch: (e: React.FormEvent) => Promise<void>
  handleStockSelect: (ticker: string) => void
}
```

### useTabData()

```typescript
{
  tabData: {
    news: any | null
    predictions: AnalystPredictions | null
    guidelines: GuidelineInfoResponse | null
  }
  loadingTab: string | null
  fetchTabData: (tab: string, ticker: string) => Promise<void>
  resetTabData: () => void
}
```

---

## 🧩 Component Props

### Sidebar

```typescript
interface SidebarProps {
  searchTicker: string;
  onSearchTickerChange: (value: string) => void;
  onSearch: (e: React.FormEvent) => void;
  onHistorySelect: (ticker: string) => void;
  searchLoading?: boolean;
}
```

### TopBar

```typescript
interface TopBarProps {
  selectedStock: CompanyResponse | null;
  userName: string | null;
  onLogout: () => void;
}
```

### CompanyInfoCard

```typescript
interface CompanyInfoCardProps {
  selectedStock: CompanyResponse;
}
```

### NewsTab

```typescript
interface NewsTabProps {
  selectedStock: CompanyResponse;
}
```

### PredictionsTab

```typescript
interface PredictionsTabProps {
  predictions: AnalystPredictions | null;
  loading: boolean;
}
```

### InvestorsTab

```typescript
interface InvestorsTabProps {
  selectedTicker: string;
}
```

### GuidelinesTab

```typescript
interface GuidelinesTabProps {
  guidelines: GuidelineInfoResponse | null;
  loading: boolean;
}
```

---

## 🔄 Data Flow Example

### When user searches for a stock:

```
1. User types in Sidebar
   └─> Sidebar calls onSearchTickerChange()
       └─> Home.tsx updates searchTicker state
2. User clicks "Analyze Stock"
   └─> Sidebar calls onSearch()
       └─> Home.tsx calls handleSearchSubmit()
           └─> useStockSearch.handleSearch() fetches data
               └─> setSelectedStock() updates state
               └─> resetTabData() clears old tab data
               └─> setActiveTab("news") switches to news tab
3. Home.tsx renders with selectedStock
   └─> CompanyInfoCard displays company info
   └─> NewsTab displays news automatically (no fetch needed initially)
4. User clicks "Predictions" tab
   └─> Home.tsx calls handleTabChange()
       └─> useTabData.fetchTabData() fetches predictions
           └─> PredictionsTab displays loading state
           └─> Once loaded, PredictionsTab shows data
```

---

## 🛠️ Common Tasks

### Task: Add a new property to Sidebar

```typescript
// 1. Update SidebarProps interface
interface SidebarProps {
  // ... existing
  newProp: string
}

// 2. Use in Sidebar component
export const Sidebar: React.FC<SidebarProps> = ({
  // ... existing
  newProp
}) => {
  // Use newProp here
}

// 3. Pass from Home.tsx
<Sidebar
  // ... existing props
  newProp={someValue}
/>
```

### Task: Add a new tab

```typescript
// 1. Create NewTab.tsx in src/components/
export const NewTab: React.FC<{ /* props */ }> = ({ }) => {
  // Component JSX
}

// 2. Add to useTabData.ts
if (tab === "newtab") {
  const res = await api.get(`/api/endpoint`);
  setTabData(prev => ({ ...prev, newtab: res.data }));
}

// 3. Add TabsTrigger in Home.tsx
<TabsTrigger value="newtab">
  <Icon className="w-4 h-4" />
  New Tab
</TabsTrigger>

// 4. Add TabsContent in Home.tsx
<TabsContent value="newtab" className="space-y-4 mt-0">
  <NewTab data={tabData.newtab} loading={loadingTab === "newtab"} />
</TabsContent>

// 5. Import NewTab in Home.tsx
import { NewTab } from "@/components/NewTab";
```

### Task: Fix a bug in stock search

```typescript
// Edit useStockSearch.ts
// The hook handles all search logic
// Changes here affect searches everywhere
```

### Task: Change profile fetch logic

```typescript
// Edit useProfileFetch.ts
// The hook handles all auth logic
// Changes here apply to all components using it
```

---

## 📊 File Sizes

| File                | Lines | Size                    |
| ------------------- | ----- | ----------------------- |
| Home.tsx            | 224   | ✅ Small & focused      |
| useProfileFetch.ts  | ~35   | ✅ Tiny                 |
| useStockSearch.ts   | ~60   | ✅ Focused              |
| useTabData.ts       | ~65   | ✅ Focused              |
| Sidebar.tsx         | ~85   | ✅ Small                |
| TopBar.tsx          | ~75   | ✅ Small                |
| CompanyInfoCard.tsx | ~170  | ✅ Normal               |
| NewsTab.tsx         | ~150  | ✅ Normal               |
| PredictionsTab.tsx  | ~400  | ⚠️ Medium (could split) |
| InvestorsTab.tsx    | ~120  | ✅ Normal               |
| GuidelinesTab.tsx   | ~80   | ✅ Small                |

---

## 🎨 Design Patterns Used

1. **Custom Hooks** - Encapsulate logic
2. **Component Composition** - Build complex UIs from simple components
3. **Props Drilling** - Pass data down the component tree
4. **Lazy Loading** - Load tab data only when needed
5. **Caching** - Prevent redundant API calls
6. **Separation of Concerns** - Data, UI, and logic separated

---

## ⚡ Performance Tips

- ✅ Tab data is cached (no refetch when switching tabs)
- ✅ Components are small (easier React optimization)
- ✅ Hooks are focused (easier to memoize if needed)
- 💡 Consider `React.memo()` for large components
- 💡 Consider `useMemo()` for expensive computations
- 💡 Consider `useCallback()` for callback props

---

## 🧪 Testing Approach

Each piece can be tested independently:

```typescript
// Test useProfileFetch hook
test("useProfileFetch fetches user data", async () => {
  // Mock api.get
  // Run hook
  // Assert user data
});

// Test Sidebar component
test("Sidebar calls onSearch when button is clicked", () => {
  // Render with props
  // Click button
  // Assert callback called
});

// Test Home integration
test("Home displays company info after search", async () => {
  // Render Home
  // Simulate search
  // Assert company card displayed
});
```

---

## 📚 Resources

- See `REFACTORING.md` for detailed guide
- See `REFACTORING_SUMMARY.md` for overview
- Check component/hook files for JSDoc comments
- TypeScript provides autocomplete and type hints

---

**Everything is now organized, maintainable, and ready to scale!** 🚀
