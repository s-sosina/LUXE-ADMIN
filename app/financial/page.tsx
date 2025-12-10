"use client"
import { GlobalTransactionsTable } from "@/components/transactions/global-transaction"


export default function FinancialPage (){

    return (
        <div className="flex flex-col gap-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">
              Financial Overview
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Monitor earnings and withdrawals
            </p>
          </div>
        </div>

        <GlobalTransactionsTable />
      </div>
    )
}