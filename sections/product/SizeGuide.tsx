import { GlobeLock } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const SizeGuide = () => {
    const tableData = [
        { size: "XXS", inches: "32-34", cm: "76-81" },
        { size: "XS", inches: "34-36", cm: "81-86" },
        { size: "S", inches: "36-38", cm: "86-91" },
        { size: "M", inches: "38-40", cm: "91-96" },
        { size: "L", inches: "40-42", cm: "96-101" },
        { size: "XL", inches: "42-44", cm: "101-106" },
    ]

    return (
        <Dialog>
            <DialogTrigger className="flex items-center gap-2 text-sm cursor-pointer">
                <GlobeLock size={16} strokeWidth={1} />
                <p>Size Guide</p>
            </DialogTrigger>
            <DialogContent className="font-jost rounded-none px-10">
                <DialogHeader>
                    <DialogTitle className="text-xl lg:text-2xl font-medium">All Sizes for This Product</DialogTitle>
                    <DialogDescription className="leading-5 my-3 text-start md:text-center text-base text-black">
                        Measure around the fullest part, place the tape closer under the arms and make sure the tape is flat across the back.
                    </DialogDescription>
                </DialogHeader>

                <div className="w-full pb-5">
                    <Table className="w-full border-collapse border">
                        <TableHeader>
                            <TableRow className="bg-black hover:bg-black border-none">
                                <TableHead className="text-white uppercase font-bold px-4 py-2 h-auto">Size</TableHead>
                                <TableHead className="text-white uppercase font-bold px-4 py-2 h-auto">Inches</TableHead>
                                <TableHead className="text-white uppercase font-bold px-4 py-2 h-auto">cm</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {tableData.map((row) => (
                                <TableRow key={row.size} className="border border-gray-200 hover:bg-gray-50/50">
                                    <TableCell className="px-4 py-2 text-sm">{row.size}</TableCell>
                                    <TableCell className="px-4 py-2 text-sm">{row.inches}</TableCell>
                                    <TableCell className="px-4 py-2 text-sm">{row.cm}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default SizeGuide